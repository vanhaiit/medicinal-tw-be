import { ContactRepository } from '@models/repositories/contact.repository';
import { OrderRepository } from '@models/repositories/order.repository';
import { ProductRepository } from '@models/repositories/product.repository';
import { UserRepository } from '@models/repositories/user.repository';
import { Injectable } from '@nestjs/common';
import { EContactStatus } from 'constant/contact.constant';
import { EOrderStatus } from 'constant/order.constant';

@Injectable()
export class DashboardService {
    constructor(
        private readonly orderRepository: OrderRepository,
        private readonly userRepository: UserRepository,
        private readonly contactRepository: ContactRepository,
        private readonly productRepository: ProductRepository,
    ) {}

    async getOverview() {
        // Get start/end of today
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);

        // Get start/end of current month
        const firstDayOfMonth = new Date(
            today.getFullYear(),
            today.getMonth(),
            1,
        );
        const lastDayOfMonth = new Date(
            today.getFullYear(),
            today.getMonth() + 1,
            0,
        );

        // Query for today's revenue (completed orders only)
        const todayRevenue = await this.orderRepository
            .createQueryBuilder('orders')
            .select('COALESCE(SUM(orders.total), 0)', 'total')
            .where(
                'orders.created_at >= :today AND orders.created_at < :tomorrow',
                {
                    today,
                    tomorrow,
                },
            )
            .andWhere('orders.status = :status', {
                status: EOrderStatus.completed,
            })
            .getRawOne()
            .then(result => result.total);

        // Get total cancelled orders
        const cancelledOrders = await this.orderRepository.count({
            where: {
                status: EOrderStatus.cancelled,
            },
        });

        // Get total number of orders
        const totalOrders = await this.orderRepository.count();

        // Get new customers this month (unique user_ids from orders within this month)
        const newCustomers = await this.userRepository
            .createQueryBuilder('users')
            .where(
                'users.created_at >= :startOfMonth AND users.created_at <= :endOfMonth',
                {
                    startOfMonth: firstDayOfMonth,
                    endOfMonth: lastDayOfMonth,
                },
            )
            .getCount();

        return {
            todayRevenue,
            totalOrders,
            newCustomersThisMonth: newCustomers,
            totalCancelledOrders: cancelledOrders,
        };
    }

    async getNotifications() {
        // Get start/end of today
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);

        // Get new orders (pending status)
        const newOrders = await this.orderRepository
            .createQueryBuilder('orders')
            .where('orders.status = :status', {
                status: EOrderStatus.pending,
            })
            .andWhere('orders.created_at >= :today', { today })
            .getCount();

        // Get new customers registered today
        const newCustomers = await this.userRepository
            .createQueryBuilder('users')
            .where('users.created_at >= :today', { today })
            .getCount();

        // Get new contact requests (pending status)
        const newContacts = await this.contactRepository
            .createQueryBuilder('contacts')
            .where('contacts.status = :status', {
                status: EContactStatus.pending,
            })
            .andWhere('contacts.created_at >= :today', { today })
            .getCount();

        // Get new products added today
        const newProducts = await this.productRepository
            .createQueryBuilder('products')
            .where('products.created_at >= :today', { today })
            .getCount();

        return {
            newOrders,
            newCustomers,
            newContacts,
            newProducts,
        };
    }
    async getRevenueChartData(
        startDate: Date,
        endDate: Date,
        timeframe: string,
    ) {
        let query: string;
        let dateFormat: string;

        // Determine the SQL query and date format based on the timeframe
        if (timeframe === 'day') {
            dateFormat = 'YYYY-MM-DD HH24:MI';
            query = `
            WITH date_series AS (
                SELECT generate_series($1::date, $2::date, '1 hour'::interval) AS order_date
            )
            SELECT 
                TO_CHAR(ds.order_date, '${dateFormat}') as date,
                COALESCE(SUM(o.total), 0) AS value
            FROM 
                date_series ds
            LEFT JOIN 
                public.orders o ON 
                    DATE_TRUNC('hour', o.created_at) = ds.order_date
                    AND o.status = '${EOrderStatus.completed}'
            GROUP BY 
                ds.order_date
            ORDER BY 
                ds.order_date;
            `;
        } else if (timeframe === 'month') {
            dateFormat = 'YYYY-MM-DD';
            query = `
            WITH date_series AS (
                SELECT generate_series($1::date, $2::date, '1 day'::interval) AS order_date
            )
            SELECT 
                TO_CHAR(ds.order_date, '${dateFormat}') as date,
                COALESCE(SUM(o.total), 0) AS value
            FROM 
                date_series ds
            LEFT JOIN 
                public.orders o ON 
                    DATE_TRUNC('day', o.created_at) = ds.order_date
                    AND o.status = '${EOrderStatus.completed}'
            GROUP BY 
                ds.order_date
            ORDER BY 
                ds.order_date;
            `;
        } else if (timeframe === 'year') {
            dateFormat = 'YYYY-MM';
            query = `
            WITH date_series AS (
                SELECT generate_series($1::date, $2::date, '1 month'::interval) AS month_date
            )
            SELECT 
                TO_CHAR(ds.month_date, '${dateFormat}') as date,
                COALESCE(SUM(o.total), 0) AS value
            FROM 
                date_series ds
            LEFT JOIN 
                public.orders o ON 
                    DATE_TRUNC('month', o.created_at) = ds.month_date
                    AND o.status = '${EOrderStatus.completed}'
            GROUP BY 
                ds.month_date
            ORDER BY 
                ds.month_date;
            `;
        } else {
            throw new Error(
                'Invalid timeframe specified. Must be "day", "month", or "year".',
            );
        }

        const result = await this.orderRepository.query(query, [
            startDate.toISOString(),
            endDate.toISOString(),
        ]);

        // Convert each result into the desired format
        return result.map(r => ({
            date: r.date,
            value: parseFloat(r.value),
        }));
    }

    async getTopSellingProducts() {
        // Get start/end of current month
        const today = new Date();
        const firstDayOfMonth = new Date(
            today.getFullYear(),
            today.getMonth(),
            1,
        );
        const lastDayOfMonth = new Date(
            today.getFullYear(),
            today.getMonth() + 1,
            0,
        );

        const query = `
            WITH product_sales AS (
                SELECT 
                    p.name as product,
                    COALESCE(SUM(oi.quantity), 0) as sales
                FROM 
                    public.products p
                    LEFT JOIN public.items i ON i.product_id = p.id
                    LEFT JOIN public.order_items oi ON oi.item_id = i.id
                    LEFT JOIN public.orders o ON o.id = oi.order_id
                WHERE 
                    o.created_at >= $1
                    AND o.created_at <= $2
                    AND o.status = '${EOrderStatus.completed}'
                GROUP BY 
                    p.name
                ORDER BY 
                    sales DESC
                LIMIT 10
            )
            SELECT 
                product,
                sales
            FROM 
                product_sales
            WHERE 
                sales > 0
            ORDER BY 
                sales DESC;
        `;

        const result = await this.orderRepository.query(query, [
            firstDayOfMonth,
            lastDayOfMonth,
        ]);

        // If no results, return empty arrays
        if (!result || result.length === 0) {
            return {
                labels: [],
                data: [],
            };
        }

        return {
            labels: result.map(r => r.product.name),
            data: result.map(r => parseInt(r.sales)),
        };
    }
}

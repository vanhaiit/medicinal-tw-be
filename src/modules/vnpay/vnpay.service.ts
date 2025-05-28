import { Injectable } from '@nestjs/common';
import * as querystring from 'querystring';
import * as crypto from 'crypto'; // Import module crypto
import { VnPayRequestDto } from './dto/vnpay.dto';
import dayjs from 'dayjs';
import { OrderRepository } from '@models/repositories/order.repository';
import { EOrderPaymentStatus, EOrderStatus } from 'constant/order.constant';
import { sendSms } from '@shared/utils/sms';

@Injectable()
export class VnPayService {
    constructor(
        private readonly orderRepository: OrderRepository,
    ) { }
    private vnp_TmnCode = process.env.VNPAY_TMN_CODE; 
    private vnp_HashSecret = process.env.VNPAY_HASH_SECRET;
    private vnp_Url = process.env.VNPAY_API_URL;
    private vnp_ReturnUrl = process.env.VNPAY_RETURN_URL;

    createPaymentUrl(body: VnPayRequestDto) {
        // Tạo vnp_TxnRef duy nhất dựa trên timestamp
        const vnp_TxnRef = Date.now().toString();
        const vnp_CreateDate = dayjs().format('YYYYMMDDHHmmss');

        let vnp_Params: any = {
            vnp_Version: '2.1.0',
            vnp_Command: 'pay',
            vnp_TmnCode: this.vnp_TmnCode,
            vnp_Locale: 'vn',
            vnp_CurrCode: 'VND',
            vnp_TxnRef: vnp_TxnRef,
            vnp_OrderInfo: 'thanhtoandonhang',
            vnp_OrderType: 'other',
            vnp_Amount: 0,
            vnp_ReturnUrl: this.vnp_ReturnUrl,
            vnp_IpAddr: '127.0.0.1',
            vnp_CreateDate,
            ...body
        };

        // Sắp xếp tham số
        vnp_Params = this.sortObject(vnp_Params);
        console.log('Sorted Params:', vnp_Params);

        // Tạo chuỗi ký
        const signData = querystring.stringify(vnp_Params);
        console.log('Sign Data:', signData);

        // Tạo chữ ký HMAC-SHA512
        const hmac = crypto.createHmac('sha512', this.vnp_HashSecret);
        const signed = hmac.update(signData, 'utf-8').digest('hex');
        console.log('Signed:', signed);

        // Thêm chữ ký vào params
        vnp_Params['vnp_SecureHash'] = signed;

        // Tạo URL cuối cùng
        const paymentUrl = this.vnp_Url + '?' + querystring.stringify(vnp_Params);
        console.log('Final URL:', paymentUrl);

        return paymentUrl;
    }

    async verifyIpnUrl(vnpParams: any) {
        try {
            const secureHash = vnpParams['vnp_SecureHash'];

            // Remove hash and hash type from params before verification
            delete vnpParams['vnp_SecureHash'];
            delete vnpParams['vnp_SecureHashType'];


            // Sort parameters before signing
            const sortedParams = this.sortObject(vnpParams);

            // Create sign data
            const signData = decodeURIComponent(querystring.stringify(sortedParams));

            // Create hash
            const hmac = crypto.createHmac('sha512', this.vnp_HashSecret);
            const signed = hmac.update(signData, 'utf-8').digest('hex');

            // Compare hashes
            if (secureHash === signed) {
                const orderId = vnpParams['vnp_TxnRef'];
                const rspCode = vnpParams['vnp_ResponseCode'];
                const order = await this.orderRepository.findOne({ where: { id: orderId } });
                await this.orderRepository.update(order.id, { paymentStatus: rspCode === '00' ? EOrderPaymentStatus.payed : EOrderPaymentStatus.payFailed });
                sendSms(
                    order?.toPhone,
                    `Đơn hàng ORDER_${order.id} thanh toán thành công!`,
                );
                return {
                    RspCode: '00',
                    Message: 'success'
                };
            } else {
                return {
                    RspCode: '97',
                    Message: 'Fail checksum'
                };
            }
        } catch (error) {
            return {
                RspCode: '99',
                Message: 'Unknown error'
            };
        }
    }

    private sortObject(obj: any) {
        const sorted: any = {};
        const keys = Object.keys(obj).sort();
        keys.forEach((key) => {
            sorted[key] = obj[key].toString(); // Chuyển tất cả giá trị thành chuỗi
        });
        return sorted;
    }
}
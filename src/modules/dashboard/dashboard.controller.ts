import { Controller, Get, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { PublicRoute } from '@shared/decorators/public-route.decorator';

import { DashboardService } from './dashboard.service';
import { ChartRequestDto } from './dtos/dashboard.request.dto';

@ApiTags('Dashboard')
@Controller('dashboard')
export class DashboardController {
    constructor(private readonly dashboardService: DashboardService) {}

    @Get('/overview')
    @PublicRoute()
    async getOverview() {
        return await this.dashboardService.getOverview();
    }

    @Get('/chart')
    @PublicRoute()
    async getChart(@Query() query: ChartRequestDto) {
        const { startDate, endDate, type } = query;
        const start = startDate ? new Date(startDate) : undefined;
        const end = endDate ? new Date(endDate) : undefined;
        return await this.dashboardService.getRevenueChartData(
            start,
            end,
            type,
        );
    }

    @Get('/top10')
    @PublicRoute()
    async getTop10() {
        return await this.dashboardService.getTopSellingProducts();
    }
}

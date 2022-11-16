import { Body, Controller, Get, Param, Post, Request, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RequestOrder } from './dto/order.dto';
import { StatusRequest } from './dto/statusRequest';
import { OrderService } from './order.service';

@ApiTags('order')
@Controller('order')
export class OrderController {
    constructor(
        private orderService: OrderService
    ) { }

    @UseGuards(JwtAuthGuard)
    @Post()
    checkout(@Request() req, @Body() dataOrder: RequestOrder) {
        console.log(req.user.id);

        return this.orderService.checkout(req.user.id, dataOrder)
    }

    @UseGuards(JwtAuthGuard)
    @Get('history')
    getOrderHistoryByUser(@Request() req) {
        return this.orderService.getOrderHistoryByUser(req.user.id);
    }

    @Get(':id')
    findOrderById(@Param('id') id: string, @Body() data: StatusRequest) {
        return this.orderService.editStatusOrder(id, data);
    }

}

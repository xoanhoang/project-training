import { Body, Controller, Get, Post, UseGuards, Request, Param, Put, Delete } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CartRequest } from 'src/order/dto/order.dto';
import { CartService } from './cart.service';

@ApiTags('cart')
@Controller('cart')
export class CartController {
    constructor(
        private cartService: CartService
    ) { }
    @UseGuards(JwtAuthGuard)
    @Post()
    addProductToCart(@Request() req, @Body() data: CartRequest) {
        console.log(req.user.id, data);
        return this.cartService.addProductToCart(req.user.id, data)
    }

    @UseGuards(JwtAuthGuard)
    @Get()
    findCartByUser(@Request() req) {
        return this.cartService.findCartByUser(req.user.id);
    }

    @Put(':id')
    updateQuantityCart(@Param('id') id: string, @Body() data : CartRequest){
        return this.cartService.updateQuantityCart(id,data);
    }

    @Delete(':id')
    deleteCart(@Param('id') id: string){
        return this.cartService.deleteCart(id)
    }
}

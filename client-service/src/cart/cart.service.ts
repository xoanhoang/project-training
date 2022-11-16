import { Inject, Injectable, Post, UseGuards } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { formatResponseDTO } from "src/constants/common";
import { systemCode } from "src/constants/messageConstants";
import { CartEntity } from "src/models/cart.entity";
import { ProductEntity } from "src/models/product.entity";
import { User } from "src/models/users.entity";
import { CartRequest } from "src/order/dto/order.dto";
import { Repository } from "typeorm";

@Injectable()
export class CartService {
    constructor(
        @InjectRepository(ProductEntity)
        private productRepo : Repository<ProductEntity>,
        @InjectRepository(User)
        private userRepo : Repository<User>,
        @InjectRepository(CartEntity)
        private cartRepo : Repository<CartEntity>,
    ){}
    
    async addProductToCart(userId: string, data: CartRequest) {
        let product = await this.productRepo.findOneBy({ id: data.productId })
        const user = await this.userRepo.findOneBy({ id:userId });
        const cart = new CartEntity();
        cart.user = user;
        cart.products = product;
        cart.quantity = data.quantity;
        return this.cartRepo.save(cart);
    }

    async findCartByUser(userId: string): Promise<formatResponseDTO> {
        const carts = await this.cartRepo.find({
            relations: {
                products: true,
                user: true
            },
            where: {
                user: {
                    id: userId
                }
            },
        })
        return {
            data: carts,
            systemCode: systemCode.SUCCESS,
            message: 'Find cart by user id successfully '
        }
    }
    async updateQuantityCart(cartId : string , data : CartRequest){
        const cart = await this.cartRepo.findOneBy({id:cartId});
        if(!cart) return{
            systemCode : systemCode.NOT_FOUND,
            message: "Cart not found",
            data : undefined
        }
        cart.quantity = data.quantity;
        return await this.cartRepo.save(cart);
    }
    
    async deleteCart(cartId : string):Promise<formatResponseDTO>{
        await this.cartRepo.delete(cartId);
        return{
            systemCode : systemCode.SUCCESS,
            message: "Delele cart successfully",
            data : undefined
        }
        
    }

}
import { HttpCode, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { formatResponseDTO } from 'src/constants/common';
import { systemCode } from 'src/constants/messageConstants';
import { EStatus } from 'src/enums/EStatus';
import { CartEntity } from 'src/models/cart.entity';
import { OrderEntity } from 'src/models/order.entity';
import { OrderDetailEntity } from 'src/models/orderDetail.entity';
import { ProductEntity } from 'src/models/product.entity';
import { User } from 'src/models/users.entity';
import { ProductService } from 'src/product/product.service';
import { Repository } from 'typeorm';
import { CartRequest, OrderDetail, OrderDto, RequestOrder } from './dto/order.dto';
import { StatusRequest } from './dto/statusRequest';

@Injectable()
export class OrderService {
    constructor(
        @InjectRepository(User)
        private userRepo: Repository<User>,
        @InjectRepository(OrderDetailEntity)
        private orderDetailRepo: Repository<OrderDetailEntity>,
        @InjectRepository(OrderEntity)
        private orderRepo: Repository<OrderEntity>,
        @InjectRepository(ProductEntity)
        private productRepo: Repository<ProductEntity>
    ) { }

    async checkout(userId, data: RequestOrder): Promise<formatResponseDTO> {
        const user = await this.userRepo.findOneBy({ id: userId })
        if (!user) throw new HttpException('User with this email does not exist', HttpStatus.NOT_FOUND);
        const order = new OrderEntity();
        order.user = user;
        order.orderDetail = [];
        order.total = 0;
        order.status = EStatus.PENDING;
        order.address = data.address;
        order.phone = data.phone;
        for (let item of data.orderDetail) {
            const orderDetail = new OrderDetailEntity();
            let product = await this.productRepo.findOneBy({ id: item.productId })
            console.log(product);
            if (product.inventory < item.quantity) {
                return {
                    data: undefined,
                    systemCode: "",
                    message: ""
                }
            }
            let stock = product.inventory - item.quantity
            product.inventory = stock;
            await this.productRepo.save(product);
            orderDetail.total = 0;
            orderDetail.total = product.price * item.quantity;
            orderDetail.product = product;
            orderDetail.quantity = item.quantity;
            order.total += product.price * item.quantity;
            const orderItem = await this.orderDetailRepo.save(orderDetail);
            order.orderDetail = [...order.orderDetail, orderItem]
        }
        let result = await this.orderRepo.save(order);
        return {
            data: result,
            systemCode: systemCode.SUCCESS,
            message: "Checkout successfully"
        }
    }

    async getOrderHistoryByUser(userId: string) {
        return await this.orderRepo.createQueryBuilder('orders')
            .leftJoinAndSelect('orders.user', 'user')
            .leftJoinAndSelect('orders.orderDetail', 'orderDetail')
            .leftJoinAndSelect('orderDetail.product', 'product')
            .select([
                'orders',
                'user.email',
                'orderDetail',
                'product'
            ])
            .where('user.id = :id', { id: userId })
            .getMany();
    }
    async editStatusOrder(orderId,data :StatusRequest){
        let order = await this.orderRepo.findOneBy({id:orderId})
        order.status = data.status;
        await this.orderRepo.save(order);
    }
}

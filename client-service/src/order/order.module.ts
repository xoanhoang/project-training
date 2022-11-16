import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/models/users.entity';
import { OrderDetailEntity } from 'src/models/orderDetail.entity';
import { OrderEntity } from 'src/models/order.entity';
import { ProductEntity } from 'src/models/product.entity';
import { CartEntity } from 'src/models/cart.entity'; 

@Module({
  imports :  [TypeOrmModule.forFeature([User,OrderDetailEntity,OrderEntity,ProductEntity])],
  providers: [OrderService],
  controllers: [OrderController]
})
export class OrderModule {}

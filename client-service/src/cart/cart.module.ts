import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AttributeEntity } from 'src/models/attribute.entity';
import { AttributeValueEntity } from 'src/models/attributeValue.entity';
import { CartEntity } from 'src/models/cart.entity';
import { ProductEntity } from 'src/models/product.entity';
import { User } from 'src/models/users.entity';
import { ProductService } from 'src/product/product.service';
import { CartController } from './cart.controller';
import { CartService } from './cart.service';

@Module({
  imports :  [TypeOrmModule.forFeature([ProductEntity,User,CartEntity,AttributeEntity,AttributeValueEntity])],
  providers: [CartService],
  controllers: [CartController]
})
export class CartModule {}

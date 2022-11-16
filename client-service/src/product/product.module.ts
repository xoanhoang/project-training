import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AttributeValueEntity } from 'src/models/attributeValue.entity';
import { AttributeEntity } from 'src/models/attribute.entity';
import { ProductEntity } from 'src/models/product.entity';
import { RolesGuard } from 'src/guards/roles.guard';
import { UsersService } from 'src/auth/user.service';
import { User } from 'src/models/users.entity';

@Module({
  imports : [TypeOrmModule.forFeature([AttributeValueEntity,AttributeEntity,ProductEntity,User])],
  providers: [ProductService,RolesGuard,UsersService],
  controllers: [ProductController]
})
export class ProductModule {}

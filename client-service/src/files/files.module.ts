import { Module } from '@nestjs/common';
import { FilesService } from './files.service';
import { FilesController } from './files.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AttributeEntity } from 'src/models/attribute.entity';
import { ProductService } from 'src/product/product.service';
import { ProductEntity } from 'src/models/product.entity';
import { AttributeValueEntity } from 'src/models/attributeValue.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AttributeEntity,ProductEntity,AttributeValueEntity])],
  providers: [FilesService,ProductService],
  controllers: [FilesController]
})
export class FilesModule {}

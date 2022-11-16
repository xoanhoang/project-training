import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Exception } from 'handlebars';
import { formatResponseDTO } from 'src/constants/common';
import { systemCode } from 'src/constants/messageConstants';
import { AttributeEntity } from 'src/models/attribute.entity';
import { AttributeValueEntity } from 'src/models/attributeValue.entity';

import { ProductEntity } from 'src/models/product.entity';
import { paginate } from 'src/util/pagination';
import { Brackets, QueryBuilder, Repository } from 'typeorm';
import { isTypedArray } from 'util/types';
import { Attribute, CreateProductDto, FilterProduct, RequestData, UpdateProductDto } from './dto/product.dto';

@Injectable()
export class ProductService {
    constructor(
        @InjectRepository(AttributeEntity)
        private attributeRepo: Repository<AttributeEntity>,
        @InjectRepository(ProductEntity)
        private productRepo: Repository<ProductEntity>,
        @InjectRepository(AttributeValueEntity)
        private attributeValue: Repository<AttributeValueEntity>,
    ) {
    }
    async createProduct(data: CreateProductDto): Promise<formatResponseDTO> {
        let product = new ProductEntity();
        product.attibuteValue = [];
        product.title = data.title;
        product.price = data.price;
        product.sku_id = data.sku;
        product.picture = data.picture;
        product.inventory = data.inventory;

        for await (const item of data.attributies) {
            const attribute = await this.attributeRepo.findOneBy({ id: item.id });
            let valueAtr = new AttributeValueEntity();
            valueAtr.value = item.value;
            valueAtr.attribute = attribute;
            let atr = await this.attributeValue.save(valueAtr);
            product.attibuteValue = [...product.attibuteValue, atr]
        }
        await this.productRepo.save(product);
        return {
            systemCode: systemCode.SUCCESS,
            message: "Create product successfully",
            data: undefined
        }
    }

    async getAllProductBySku({ page = 1, limit = 3 }: RequestData): Promise<formatResponseDTO> {
        const products = await this.productRepo.createQueryBuilder("product")
            .distinctOn(["product.sku_id"]).orderBy("product.sku_id")
            .skip((page - 1) * limit).take(limit)
            .getMany();
        return {
            data: products,
            systemCode: systemCode.SUCCESS,
            message: "Get all product successfully",
        }
    }

    async getProductBy({ keyword, price, page = 1, limit = 3, idAttribute }: RequestData) {
        let result = [];
        const qb = await this.productRepo.createQueryBuilder("product")
            .orderBy('product.id', 'ASC')
            .leftJoinAndSelect('product.attibuteValue', 'attibuteValue')
            .leftJoinAndSelect('attibuteValue.attribute', 'attribute')
            .distinctOn(["product.sku_id"]).orderBy("product.sku_id")
            .select([
                'attibuteValue.value',
                'product'
            ]);


        if (idAttribute) {
            qb.andWhere("attibuteValue.value = :value", { idAttribute })
        }
        if (price) {
            qb.andWhere("product.price = :price", { price })
        }
        if (keyword) {
            qb.andWhere(
                new Brackets(sqb => {
                    sqb.where('product.title ILIKE :keyword', {
                        keyword: `%${keyword}%`,
                    });
                }),
            )
        }
        const products = await qb.getMany();
        for (let i of products) {
            let product = await this.findProductById(i.id);
            result = [...result, product];
        }
        let paginationObject = paginate(result, page, limit);
        return paginationObject.items;
    }

    async findProductById(idProduct: string) {
        const attrvalue = this.productRepo.createQueryBuilder('product')
            .leftJoinAndSelect('product.attibuteValue', 'attibuteValue')
            .leftJoinAndSelect('attibuteValue.attribute', 'attribute')
            .select([
                'product',
                'attibuteValue',
                'attribute.id',
                'attribute.name'
            ]);
        attrvalue.andWhere('product.id = :id', { id: idProduct });
        return await attrvalue.getOne()

    }

    async findProductFilterBy({ keyword, page = 1, limit = 5, value }: FilterProduct) {
        const attrvalue = this.productRepo.createQueryBuilder('product')
            .leftJoinAndSelect('product.attibuteValue', 'attibuteValue')
            .leftJoinAndSelect('attibuteValue.attribute', 'attribute')
            .select([
                'product',
                'attibuteValue',
                'attribute.id',
                'attribute.name'
            ]);
    }

    async findProductBySku(sku_id: string) {
        return await this.productRepo.createQueryBuilder('product')
            .leftJoinAndSelect('product.attibuteValue', 'attibuteValue')
            .leftJoinAndSelect('attibuteValue.attribute', 'attribute')
            .where(
                "sku_id  = :sku_id", { sku_id: sku_id }
            )
            .getMany()
    }
    async updateProduct(pid: string, data: UpdateProductDto): Promise<formatResponseDTO> {
        const product = await this.productRepo.findOneBy({ id: pid });
        if (!product) throw new HttpException(
            {
                systemCode: HttpStatus.BAD_REQUEST,
                message: 'Product not found'
            },
            HttpStatus.BAD_REQUEST,
        )
        product.price = data.price;
        product.title = data.title;
        product.sku_id = data.sku;
        product.picture = data.picture;
        product.inventory = data.inventory;
        product.attibuteValue = [];
        for (const item of data.attributies) {
            const attribute = await this.attributeRepo.findOneBy({ id: item.id });
            let valueAttr = await this.attributeValue.findOneBy({ id: item.attributeValueId })
            valueAttr.value = item.value;
            valueAttr.attribute = attribute;
            let atr = await this.attributeValue.save(valueAttr);
            product.attibuteValue = [...product.attibuteValue, atr]
        }
        await this.productRepo.save(product);
        return {
            data: undefined,
            systemCode: systemCode.SUCCESS,
            message: 'Update product successfully ',
        }
    }

}

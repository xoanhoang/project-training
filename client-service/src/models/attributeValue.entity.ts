import { Attribute } from "src/product/dto/product.dto";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { AttributeEntity } from "./attribute.entity";
import { ProductEntity } from "./product.entity";

@Entity('attribute_value')
export class AttributeValueEntity{
    @PrimaryGeneratedColumn()
    id : string;

    @Column()
    value : string;

    @ManyToOne(()=>ProductEntity ,(product)=>product.attibuteValue)
    product: ProductEntity;

    @ManyToOne(()=>AttributeEntity ,(attribute)=>attribute.attibuteValue)
    attribute: AttributeEntity;
}
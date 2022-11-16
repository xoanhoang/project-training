import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { AttributeValueEntity } from "./attributeValue.entity";
import { CartEntity } from "./cart.entity";
import { OrderDetailEntity } from "./orderDetail.entity";

@Entity('product')
export class ProductEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;
    
    @Column()
    title: string;

    @Column()
    price: number;

    @Column({nullable:true})
    sku_id: string; 

    @Column()
    picture: string;

    @Column()
    inventory: number;

    @OneToMany(()=>AttributeValueEntity,(attribute_value)=>attribute_value.product)
    attibuteValue : AttributeValueEntity[];

    @OneToMany(()=>OrderDetailEntity,(orderDetail)=>orderDetail.product)
    orderDetail : OrderDetailEntity[];

}

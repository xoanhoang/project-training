import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { OrderEntity } from "./order.entity";
import { ProductEntity } from "./product.entity";

@Entity('orderDetail')
export class OrderDetailEntity {
    @PrimaryGeneratedColumn()
    id : number;

    @Column()
    quantity : number;

    @Column(
        {nullable: true}
    )
    total : number

    @ManyToOne(()=>OrderEntity ,(order)=>order.orderDetail)
    order : OrderEntity;

    @ManyToOne(()=>ProductEntity,(product)=>product.orderDetail)
    product: ProductEntity;

    
}

import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { ProductEntity } from "./product.entity";
import { User } from "./users.entity";

@Entity('cart')
export class CartEntity {
    @PrimaryGeneratedColumn()
    id : string; 

    @Column({nullable:true})
    quantity : number;

    @ManyToOne(()=>ProductEntity)
    products : ProductEntity;

    @ManyToOne(()=>User,(user)=>user.carts)
    user : User;


}
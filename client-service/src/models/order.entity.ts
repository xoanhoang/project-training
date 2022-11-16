import { EStatus } from "src/enums/EStatus";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { OrderDetailEntity } from "./orderDetail.entity";
import { User } from "./users.entity";

@Entity('orders')
export class OrderEntity {
    @PrimaryGeneratedColumn()
    id : number;

    @Column()
    total : number;

    @Column({nullable:true, type: 'enum', enum: EStatus })
    status : EStatus;

    @Column()
    address : string; 

    @Column()
    phone : string;

    @ManyToOne(()=>User,(user)=>user.Orders)
    user : User

    @OneToMany(()=>OrderDetailEntity,(ordeDetail)=>ordeDetail.order)
    orderDetail : OrderDetailEntity[] 
}
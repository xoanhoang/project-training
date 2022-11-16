import { Role } from "src/enums/ERole";
import * as bcrypt from 'bcrypt';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, JoinColumn, OneToOne, BeforeInsert } from "typeorm";
import { CartEntity } from "./cart.entity";
import { OrderEntity } from "./order.entity";

@Entity('users')
export class User {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    email: string;

    @Column()
    password: string;

    @Column()
    username: string;

    @Column()
    address: string;

    @Column()
    phoneNumber: string;

    @Column({ type: 'enum', enum: Role, default: Role.USER })
    role: Role;

    @Column({ default: false })
    isEmailConfirmed: boolean;

    @OneToMany(() => OrderEntity, (order) => order.user)
    Orders: OrderEntity[];

    @OneToMany(() => CartEntity, (cart) => cart.user)
    carts: CartEntity[];

    @BeforeInsert()
    async hashPassword() {
        this.password = await bcrypt.hash(this.password, Number(process.env.HASH_SALT)); 
    }

}
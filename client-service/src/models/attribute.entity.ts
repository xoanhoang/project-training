import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { AttributeValueEntity } from "./attributeValue.entity";

@Entity('attribute')
export class AttributeEntity {
    @PrimaryGeneratedColumn()
    id : string;

    @Column()
    name : string;

    @OneToMany(()=>AttributeValueEntity,(attribute_value)=>attribute_value.attribute)
    attibuteValue : AttributeValueEntity[];
}
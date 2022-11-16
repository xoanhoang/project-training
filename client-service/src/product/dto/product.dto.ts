import { IsEmpty, IsNotEmpty, IsNumber, IsNumberString, IsString } from "@nestjs/class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { AttributeValueEntity } from "src/models/attributeValue.entity";

export class CreateProductDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty({type :String,description:'sku'})
    sku : string;

    @IsString()
    @ApiProperty({type :String,description:'title'})
    title: string;

    @IsNumber()
    @ApiProperty({type :Number,description:'price'})
    price: number;

    @IsString()
    @ApiProperty({type :String,description:'picture'})
    picture: string;

    @IsNumber()
    @ApiProperty({type :Number,description:'inventory'})
    inventory: number;

    @ApiProperty()
    attributies: Attribute[];
}

export class UpdateProductDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty({type :String,description:'sku'})
    sku : string;

    @IsNumber()
    @ApiProperty({type :String,description:'title'})
    title: string;

    @IsNumber()
    @ApiProperty({type :Number,description:'price'})
    price: number;

    @IsString()
    @ApiProperty({type :String,description:'picture'})
    picture: string;

    @IsString()
    @ApiProperty({type :String,description:'inventory'})
    inventory: number;

    @ApiProperty()
    attributies: UpdateAttribute[];
}

export class Attribute {
    @IsString()
    @ApiProperty({type :String,description:'id'})
    id: string;

    @IsString()
    @ApiProperty({type :String,description:'value'})
    value: string;
}
export class UpdateAttribute {
    id: string;

    @IsString()
    @ApiProperty({type :String,description:'attributeValueId'})
    attributeValueId: string;

    @IsString()
    @ApiProperty({type :String,description:'value'})
    value?: string;
}

export class FilterProduct {
    keyword?: string;
    value : string
    page: number;
    limit: number;
}
export class RequestData {
    keyword?: string;
    idAttribute?: string
    page: number;
    limit: number;
    price: number;
}
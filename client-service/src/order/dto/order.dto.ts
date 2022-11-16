import { User } from "src/models/users.entity";


export class OrderDto {
    idProduct : string;
    attribute : attributeValue
}
export class attributeValue {
    size : string;
    color : string;
}
export class RequestOrder {
    phone : string;
    address : string;
    status : boolean;
    orderDetail :OrderDetail[]
}
export class OrderDetail {
    productId : string;
    quantity : number;
}
export class CartRequest {
    productId: string;
    quantity : number;  
}
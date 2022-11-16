import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { formatResponseDTO } from "src/constants/common";
import { systemCode } from "src/constants/messageConstants";
import { AttributeValueEntity } from "src/models/attributeValue.entity";
import { Repository } from "typeorm";

@Injectable()
export class ProductService {
    constructor(
        @InjectRepository(AttributeValueEntity)
        private attributeValueRepo : Repository<AttributeValueEntity>
    ){}
    
    async findAttributeValueById(attrValueid : string):Promise<formatResponseDTO>{
        const attrVulue = await this.attributeValueRepo.findOneBy({id:attrValueid})
        if(!attrVulue){
            return {
                systemCode : systemCode.NOT_FOUND,
                message : "Unable to Find sub_catagory With This Id",
                data:attrVulue 
            }
        }
        return {
            systemCode : systemCode.SUCCESS,
            message : "Find product successfully",
            data:attrVulue 
        }
    }
}
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AttributeEntity } from 'src/models/attribute.entity';
import { Attribute, CreateProductDto } from 'src/product/dto/product.dto';
import { ProductService } from 'src/product/product.service';
import { Repository, ReturningStatementNotSupportedError } from 'typeorm';
const fs = require("fs");
const { parse } = require("csv-parse");

@Injectable()
export class FilesService {
    constructor(
        private productService: ProductService
    ) {}
    async createProductCSV(file: Express.Multer.File) {
        const readCSVData = async () => new Promise((resolve, reject) => {
            let a = []
            fs.createReadStream(`./src/files/${file.originalname}`)
                .pipe(parse({ delimiter: ",", from_line: 2 }))
                .on("data", async function (row) {
                    a.push(row);
                })
                .on('end', function () {
                    resolve(a)
                })
                .on('error', function (error) {
                    reject(error)
                });
        })
        const product = async () => {
            const data = await readCSVData() as any;
            data.map(i => {         
                let dataInput: CreateProductDto = {
                    title: i[0],
                    price: i[1],
                    sku: i[2],
                    inventory: i[4],
                    picture: i[3],
                    attributies: [
                        {
                            id: i[7],
                            value: i[5]
                        },
                        {
                            id: i[8],
                            value: i[6]
                        }
                    ]
                }
                this.productService.createProduct(dataInput);
            })
        }
        return product();
    }
}

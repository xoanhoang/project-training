import { Body, Controller, Get, Injectable, Param, ParseIntPipe, Post,Request,Query, UseGuards, Put } from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Roles } from 'src/decorators/roles.decorator';
import { Role } from "src/enums/ERole";
import { RolesGuard } from 'src/guards/roles.guard';
import { CreateProductDto, UpdateProductDto } from './dto/product.dto';
import { ProductService } from './product.service';
@ApiTags('product')
@Controller('product')
export class ProductController {
    constructor(
        private productService : ProductService
    ){}

    @ApiBearerAuth()	
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(Role.ADMIN)
    @Post()
    @ApiResponse({ status: 201, description: 'The record has been successfully created.'})
    createProduct(@Body() data : CreateProductDto){
        return this.productService.createProduct(data); 
    }

    @Get('filter')
    getAllProductBy(@Query() req) {
        return this.productService.getProductBy(req);
    }

    @Get()
    getAllProduct(@Query() req){
        return this.productService.getAllProductBySku(req);
    }

    @Get(':pid')
    getProductById(@Param('pid') pid : string){
        return this.productService.findProductById(pid);
    }
    @Get('detail/:sku')
    getProductBySku(@Param('sku') sku : string){
        return this.productService.findProductBySku(sku); 
    }

    @Put(':id')
    updatePoduct(@Param('id') pid : string,@Body() data : UpdateProductDto){
        return this.productService.updateProduct(pid,data);  
    }
    
}

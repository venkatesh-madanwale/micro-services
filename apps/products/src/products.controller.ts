import { Controller, Post, Body, UploadedFile, UseInterceptors, Get, Param } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Inject } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { AddProductDto } from './dto/add-product.dto';
import { multerConfig } from './multer.config';
import { File as MulterFile } from 'multer';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsGatewayController {
  constructor(private productService: ProductsService) { }
  @Post('add')
  @UseInterceptors(FileInterceptor('pimg', multerConfig))
  async addProduct(@Body() body: AddProductDto, @UploadedFile() file: MulterFile) {
    const filename = file?.filename || '';
    return this.productService.addProduct(body, file);
  }
}

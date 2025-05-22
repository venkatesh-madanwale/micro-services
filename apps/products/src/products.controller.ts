import { Controller, Post, Body, UploadedFile, UseInterceptors, Get, Param } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Inject } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { AddProductDto } from './dto/add-product.dto';
import { multerConfig } from './multer.config';
// import { File as MulterFile } from 'multer';
import { ProductsService } from './products.service';
import { diskStorage } from 'multer';
import { extname } from 'path';

// We are using Controller Decorator to control the services of the application.
@Controller('products')
export class ProductsGatewayController {
  // We are injecting product service as dependency to product controller class via loose-coupling
  // Setter, getters and binding is done my @Controller (NEST.js is taking care of it)
  constructor(private productService: ProductsService) { }
  //We are having a POST request with the URL parameter
  // We are using UseInterceptors() for intercepting file operations, using FileInterceptor with imgage and getting file extentions back.
  // Adding the product with AddProductDto as the Type and uploaded file using Express Multer file
  @Post('add')
  @UseInterceptors(FileInterceptor('pimg', {
    storage: diskStorage({
      destination: './prodimgs',
      filename: (req,file,cb)=>{
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        const ext = extname(file.originalname); // gets .jpg, .png, etc.
        cb(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
      }
    })
  }))
  async addProduct(@Body() body: AddProductDto, @UploadedFile() file: Express.Multer.File) {
    const filename = file?.filename || '';
    return this.productService.addProduct(body, file);
  }
}
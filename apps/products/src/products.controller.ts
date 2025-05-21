import { Controller, Post, Body, UploadedFile, UseInterceptors } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Inject } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { AddProductDto } from './dto/add-product.dto';
import { multerConfig } from './multer.config';
import { File as MulterFile } from 'multer';

@Controller('products')
export class ProductsGatewayController {
  constructor(@Inject('PRODUCT_SERVICE') private readonly client: ClientProxy) {}

  @Post('add')
  @UseInterceptors(FileInterceptor('pimg', multerConfig))
  async addProduct(@Body() body: AddProductDto, @UploadedFile() file: MulterFile) {
    const filename = file?.filename || '';
    const response = await this.client
      .send({ cmd: 'add-product' }, { dto: body, filename })
      .toPromise();

    return response;
  }
}

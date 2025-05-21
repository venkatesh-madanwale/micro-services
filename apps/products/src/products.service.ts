import {  Injectable,  InternalServerErrorException,  Inject,} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AddProductDto } from './dto/add-product.dto';
import { Product, ProductDocument } from './schemas/product.schema';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<ProductDocument>,
    @Inject('CATEGORY_SERVICE') private client: ClientProxy,
  ) {}


  async addProduct(dto: AddProductDto, file: { filename?: string }) {
  try {
    const newProduct = new this.productModel({
      ...dto,
      pimg: file?.filename || '',
    });

    await newProduct.save();

    // 1. Check if category exists
    const existingCat = await firstValueFrom(
      this.client.send({ cmd: 'get_category_by_name' }, dto.cat),
    );

    // 2. If not found, create it
    if (!existingCat) {
      await firstValueFrom(
        this.client.send({ cmd: 'create_category' }, { cat: dto.cat, desc: '' }),
      );
    }

    return {
      msg: 'Product added successfully',
      product: newProduct,
    };
  } catch (err) {
    console.error('Error saving product:', err);
    throw new InternalServerErrorException('Could not save product');
  }
}
}

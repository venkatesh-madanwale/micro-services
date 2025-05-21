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

      // Emit event to Category microservice
      this.client.emit('product_created', {
        name: newProduct.name,
        cat: newProduct.cat,
      });

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

import { Injectable, InternalServerErrorException, Inject, } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AddProductDto } from './dto/add-product.dto';
import { Product, ProductDocument } from './schemas/product.schema';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

// We are using Injectable to inject the ProductsService
@Injectable()
export class ProductsService {
  constructor(
    // Injecting Mongo Model and Category_Service to use it for Computation
    @InjectModel(Product.name) private productModel: Model<ProductDocument>,
    @Inject('CATEGORY_SERVICE') private client: ClientProxy,
  ) { }

  // Adding the Product with AddProductDto
  async addProduct(dto: AddProductDto, file: { filename?: string }) {
    try {
      const newProduct = new this.productModel({
        ...dto,
        pimg: file?.filename || '',
      });
      //Saving the product in Mongo 
      await newProduct.save();

      // 1. Check if category exists
      // firstValueForm() --To exchange data from one service to another
      const existingCat = await firstValueFrom(
        this.client.send({ cmd: 'get_category_by_name' }, dto.cat),
      );

      // 2. If not found, create it
      //sending the data to category client proxy
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

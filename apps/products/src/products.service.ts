// src/products/products.service.ts
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AddProductDto } from './dto/add-product.dto';
import { Product, ProductDocument } from './schemas/product.schema';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<ProductDocument>
  ) {}

  async addProduct(dto: AddProductDto, file: { filename?: string }) {
    try {
      const newProduct = new this.productModel({
        ...dto,
        pimg: file?.filename || '',
      });

      await newProduct.save();
      return { msg: 'Product added' };
    } catch (err) {
      console.error('Error saving product:', err);
      throw new InternalServerErrorException('Could not save product');
    }
  }
}

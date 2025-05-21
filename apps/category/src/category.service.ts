import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product } from './products.schema';

@Injectable()
export class CategoryService {
  constructor(@InjectModel(Product.name) private productModel: Model<Product>) {}

  async getByCategory(category: string) {
    try {
      return await this.productModel.find({ cat: category }).exec();
    } catch (err) {
      throw new Error('Error fetching category products');
    }
  }
}

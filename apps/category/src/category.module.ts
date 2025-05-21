import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { Product, ProductSchema } from './products.schema';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/your-db-name'), // Update your MongoDB URI
    MongooseModule.forFeature([{ name: Product.name, schema: ProductSchema }]),
  ],
  controllers: [CategoryController],
  providers: [CategoryService],
})
export class CategoryModule {}

// products.module.ts
import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ProductsService } from './products.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Product, ProductSchema } from './schemas/product.schema';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ProductsGatewayController } from './products.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
            isGlobal:true,
            envFilePath:'apps/products/.env'
        }),
    MongooseModule.forFeature([{ name: Product.name, schema: ProductSchema }]),
    // ConfigModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ClientsModule.register([
      {
        name: 'CATEGORY_SERVICE',
        transport: Transport.TCP,
        options: {
          host: 'localhost',
          port: 3004,
        },
      },
    ]),


  ],
  controllers: [ProductsGatewayController],
  providers: [ProductsService],
})
export class ProductsModule { }

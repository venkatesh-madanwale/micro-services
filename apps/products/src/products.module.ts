// products.module.ts
import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
// import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
// import { ProductsGatewayController } from './products.gateway.controller'; // your gateway/controller that uses PRODUCT_SERVICE
import { MongooseModule } from '@nestjs/mongoose';
import { Product, ProductSchema } from './schemas/product.schema';
import { ProductsGatewayController } from './products.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Product.name, schema: ProductSchema }]),
    
    // ✅ Register PRODUCT_SERVICE here
    ClientsModule.register([
      {
        name: 'PRODUCT_SERVICE',
        transport: Transport.TCP,
        options: {
          host: '127.0.0.1',
          port: 3003,
        },
      },
    ]),
  ],
  controllers: [ProductsGatewayController, ProductsGatewayController],
  providers: [ProductsService],
})
export class ProductsModule {}

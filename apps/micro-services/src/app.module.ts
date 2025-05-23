import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { JwtStrategy } from 'apps/auth/src/strategy/jwt.strategy';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductsModule } from 'apps/products/src/products.module';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AuthModule } from 'apps/auth/src/auth.module';
import { UsersModule } from 'apps/user/src/user.module';
import { CategoryModule } from 'apps/category/src/category.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    ClientsModule.registerAsync([
      {
        name: 'AUTH_SERVICE',
        imports: [ConfigModule],
        inject: [ConfigService],
        useFactory: async (config: ConfigService) => {
          // Read host and port from environment variables
          const host = config.get<string>('USER_TCP_HOST') || '127.0.0.1';
          const port = config.get<number>('AUTH_TCP_PORT') || 8080;

          // Log to confirm values are being read correctly
          console.log(`AUTH_SERVICE HOST: ${host}, PORT: ${port}`);

          return {
            transport: Transport.TCP,
            options: {
              host, // same as host: host
              port, // same as port: port
            },
          };
        },

      },

      {
        name: 'USER_SERVICE',
        imports: [ConfigModule],
        inject: [ConfigService],
        useFactory: async (config: ConfigService) => {
          // Read host and port from environment variables
          const host = config.get<string>('USER_TCP_HOST') || '127.0.0.1';
          const port = config.get<number>('USER_TCP_PORT') || 8080;

          // Log to confirm values are being read correctly
          console.log(`USER_SERVICE HOST: ${host}, PORT: ${port}`);

          return {
            transport: Transport.TCP,
            options: {
              host, // same as host: host
              port, // same as port: port
            },
          };
        },
      },

      {
        name: 'PRODUCT_SERVICE',
        imports: [ConfigModule],
        inject: [ConfigService],
        useFactory: async (config: ConfigService) => {
          // Read host and port from environment variables
          const host = config.get<string>('PRODUCT_TCP_HOST') || '127.0.0.1';
          const port = config.get<number>('PRODUCT_TCP_PORT') || 8080;

          // Log to confirm values are being read correctly
          console.log(`PRODUCT_SERVICE HOST: ${host}, PORT: ${port}`);

          return {
            transport: Transport.TCP,
            options: {
              host, // same as host: host
              port, // same as port: port
            },
          };
        },
      },
      {
        name: 'CATEGORY_SERVICE',
        imports: [ConfigModule],
        inject: [ConfigService],
        useFactory: async (config: ConfigService) => {
          // Read host and port from environment variables
          const host = config.get<string>('CATEGORY_TCP_HOST') || '127.0.0.1';
          const port = config.get<number>('CATEGORY_TCP_PORT') || 8080;

          // Log to confirm values are being read correctly
          console.log(`CATEGORY_SERVICE HOST: ${host}, PORT: ${port}`);

          return {
            transport: Transport.TCP,
            options: {
              host, // same as host: host
              port, // same as port: port
            },
          };
        },
      }

    ]),
    ConfigModule.forRoot({
      isGlobal: true, // This makes it available app-wide
    }),
    MongooseModule.forRoot(process.env.MONGO_URI || "mongodb+srv://madanwalevenkateshj:guqbWxgK5KVq9h9w@cluster0.w3gibek.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"),
    ConfigModule.forRoot(),
    ProductsModule,
    AuthModule,
    UsersModule,
    CategoryModule],
  controllers: [AppController],
  providers: [AppService, JwtStrategy],
})
export class AppModule { }

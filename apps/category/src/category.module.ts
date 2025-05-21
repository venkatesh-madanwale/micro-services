import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Category, CategorySchema } from './schema/category.schema';
import { CategoryController } from './category.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
            isGlobal:true,
            envFilePath:'apps/category/.env'
        }),
    ConfigModule.forRoot({ isGlobal: true }),
            MongooseModule.forRootAsync({
                imports: [ConfigModule],
                inject: [ConfigService],
                useFactory: async (config: ConfigService) => ({
                    uri: config.get<any>('MONGO_URI')
                })
            }),
            MongooseModule.forFeature([{
                name: Category.name,
                schema: CategorySchema
            }])
  ],
  providers: [CategoryService],
  controllers: [CategoryController]
})
export class CategoryModule {}

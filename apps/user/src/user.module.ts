import { Module } from '@nestjs/common';
import {UserService} from './user.service'
import { MongooseModule } from '@nestjs/mongoose'
import { UserController } from './user.controller';
import { UserSchema, User } from './schema/user.schema';

@Module({
    imports: [
        MongooseModule.forFeature([{
            name:User.name,
            schema:UserSchema
        }])
    ],
    controllers:[UserController],
    providers:[UserService],
    exports: [UserService]
})
export class UsersModule {}
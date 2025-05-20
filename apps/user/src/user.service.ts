import { Module, NotFoundException } from '@nestjs/common';
import { Injectable, ConflictException } from '@nestjs/common';
import { InjectModel, MongooseModule } from '@nestjs/mongoose';
import { UserController } from './user.controller';
import { User, UserDocument, UserSchema } from './schema/user.schema';
// import { AuthService } from 'src/auth/auth.service';

import {Model } from 'mongoose';

@Injectable()
export class UserService {
    constructor(@InjectModel(User.name) private userModel: Model<UserDocument>){
    }

    async findByEmail(emailid:string ):Promise<User | null >{
        return this.userModel.findOne({ emailid });
    }
    async create(data:Partial<User>):Promise<User>{
        const newUser = new this.userModel(data)
        return newUser.save()
    }
    async updateUser(id: string, updateData: Partial<User>): Promise<User> {
    const updatedUser = await this.userModel.findByIdAndUpdate(id, updateData, {
      new: true,
    });

    if (!updatedUser) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    return updatedUser;
  }

  async deleteUser(id: string): Promise<{ message: string }> {
    const result = await this.userModel.findByIdAndDelete(id);

    if (!result) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    return { message: 'User deleted successfully' };
  }
}

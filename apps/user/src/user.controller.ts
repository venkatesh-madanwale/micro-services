import { Controller } from '@nestjs/common';
import { UserService } from './user.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { User } from './schema/user.schema';

@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService) { }

    @MessagePattern({ cmd: "find-by-email" })
    async findByEmail(email: string) {
        return this.userService.findByEmail(email)
    }

    @MessagePattern({ cmd: "account-creates" })
    async create(data: Partial<User>): Promise<User> {
        return this.userService.create(data)
    }

    @MessagePattern({ cmd: 'update-user' })
    async update(@Payload() payload: { id: string; data: Partial<User> }): Promise<User> {
        // Extract user ID and the partial user data to update
        // Call the user service to perform the update and return the updated user
        return this.userService.updateUser(payload.id, payload.data);
    }

    @MessagePattern({ cmd: 'delete-user' }) // Delete user by ID
    async delete(@Payload() id: string): Promise<{ message: string }> {
        return this.userService.deleteUser(id);
    }

}
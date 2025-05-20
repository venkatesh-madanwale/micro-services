import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
// import { UsersModule } from "src/users/users.module";
import { AuthController } from "./auth.contoller";
import { JwtModule } from "@nestjs/jwt";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { UsersModule } from "apps/user/src/user.module";
import { ClientsModule, Transport } from "@nestjs/microservices";


@Module({
    imports: [
        ClientsModule.register([
            {
                name:'USER_SERVICE',
                transport: Transport.TCP,
                options:{
                    host:'127.0.0.1',
                    port: 3001
                }
            }
        ])
    ],
    providers: [AuthService],
    controllers: [AuthController],
    exports: [AuthService]
})
export class AuthModule { }
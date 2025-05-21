import { Inject, Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.contoller";
import { JwtModule } from "@nestjs/jwt";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { ClientsModule, Transport } from "@nestjs/microservices";
import { JwtStrategy } from "./strategy/jwt.strategy";
import { config } from "process";


@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal:true,
            envFilePath:'apps/auth/.env'
        }),
        ClientsModule.registerAsync([
            {
                name: 'USER_SERVICE',
                imports: [ConfigModule],
                inject: [ConfigService],
                useFactory: async (config: ConfigService) => {
                    const host = await config.get("USER_SERVICE_HOST");
                    console.log(`userService host: ${host}`)
                    return {
                        transport: Transport.TCP,
                        options: {
                            // host: config.get<string>('USER_SERVICE_HOST'),
                            // port: config.get<number>('USER_SERVICE_PORT')
                            host: config.get<string>('USER_SERVICE_HOST'),
                            port: config.get<number>('USER_SERVICE_PORT')
                        }
                    }
                },
            }
        ]),
        JwtModule.registerAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: async (config: ConfigService) => {
                return {
                    secret: config.get<string>('JWT_SECRET'),
                    signOptions: {
                        expiresIn: "1d"
                    }
                };
            }
        })
    ],
    providers: [JwtStrategy, AuthService],
    controllers: [AuthController],
    exports: [AuthService]
})
export class AuthModule { }
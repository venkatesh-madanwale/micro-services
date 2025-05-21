import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.contoller";
import { JwtModule } from "@nestjs/jwt";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { ClientsModule, Transport } from "@nestjs/microservices";
import { JwtStrategy } from "./strategy/jwt.strategy";


@Module({
    imports: [
        ConfigModule,
        ConfigModule.forRoot({
        isGlobal: true,}),
        ClientsModule.register([
            {
                name: 'USER_SERVICE',
                transport: Transport.TCP,
                options: {
                    host: '127.0.0.1',
                    port: 3001
                }
            }
        ]),
        JwtModule.registerAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: async (ConfigService: ConfigService) => {
                return {
                    secret: ConfigService.get<string>('JWT_SECRET'),
                    signOptions: {
                        expiresIn: "1d"
                    }
                };
            }
        })
    ],
    providers: [JwtStrategy,AuthService],
    controllers: [AuthController],
    exports: [AuthService]
})
export class AuthModule { }
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { JwtStrategy } from 'apps/auth/src/strategy/jwt.strategy';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
  ConfigModule.forRoot({
      isGlobal: true, // This makes it available app-wide
    }),],
  controllers: [AppController],
  providers: [AppService,JwtStrategy],
})
export class AppModule {}

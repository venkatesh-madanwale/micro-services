import { NestFactory } from '@nestjs/core';
import { StrategyModule } from './strategy.module';

async function bootstrap() {
  const app = await NestFactory.create(StrategyModule);
  await app.listen(process.env.port ?? 3000);
}
bootstrap();

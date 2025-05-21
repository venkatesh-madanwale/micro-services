import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { CategoryModule } from './category.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(CategoryModule, {
    transport: Transport.TCP,
    options: {
      host: '127.0.0.1', // or '0.0.0.0' for all interfaces
      port: 3004,
    },
  });
  await app.listen();
  console.log('Category microservice is running on TCP port 3004');
}
bootstrap();
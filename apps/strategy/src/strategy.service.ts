import { Injectable } from '@nestjs/common';

@Injectable()
export class StrategyService {
  getHello(): string {
    return 'Hello World!';
  }
}

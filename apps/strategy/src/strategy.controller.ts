import { Controller, Get } from '@nestjs/common';
import { StrategyService } from './strategy.service';

@Controller()
export class StrategyController {
  constructor(private readonly strategyService: StrategyService) {}

  @Get()
  getHello(): string {
    return this.strategyService.getHello();
  }
}

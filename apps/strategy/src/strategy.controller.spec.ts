import { Test, TestingModule } from '@nestjs/testing';
import { StrategyController } from './strategy.controller';
import { StrategyService } from './strategy.service';

describe('StrategyController', () => {
  let strategyController: StrategyController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [StrategyController],
      providers: [StrategyService],
    }).compile();

    strategyController = app.get<StrategyController>(StrategyController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(strategyController.getHello()).toBe('Hello World!');
    });
  });
});

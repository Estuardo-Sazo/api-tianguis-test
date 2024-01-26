import { Test, TestingModule } from '@nestjs/testing';
import { ResponsesQuoteController } from './responses-quote.controller';

describe('ResponsesQuoteController', () => {
  let controller: ResponsesQuoteController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ResponsesQuoteController],
    }).compile();

    controller = module.get<ResponsesQuoteController>(ResponsesQuoteController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

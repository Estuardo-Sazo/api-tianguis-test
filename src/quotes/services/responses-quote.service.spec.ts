import { Test, TestingModule } from '@nestjs/testing';
import { ResponsesQuoteService } from './responses-quote.service';

describe('ResponsesQuoteService', () => {
  let service: ResponsesQuoteService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ResponsesQuoteService],
    }).compile();

    service = module.get<ResponsesQuoteService>(ResponsesQuoteService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

import { Module } from '@nestjs/common';
import { QuotesService } from './services/quotes.service';
import { ResponsesQuoteService } from './services/responses-quote.service';
import { ResponsesQuoteController } from './controllers/responses-quote.controller';
import { QuotesController } from './controllers/quotes.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Quote } from './entitites/quote.entity';
import { ResponseQuote } from './entitites/responseQuote.entity';
import { MarketplaceModule } from 'src/marketplace/marketplace.module';

@Module({
  imports: [
    MarketplaceModule,
    TypeOrmModule.forFeature([Quote, ResponseQuote]),
  ],
  providers: [QuotesService, ResponsesQuoteService],
  controllers: [ResponsesQuoteController, QuotesController],
})
export class QuotesModule {}

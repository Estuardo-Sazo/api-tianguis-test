import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { User } from 'src/auth/entities/user.entity';
import { CreateQuoteDto, UpdateQuoteDto } from '../dtos/quote.dto';
import { QuotesService } from '../services/quotes.service';
import { Request } from 'express';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Public } from 'src/auth/decorators/public.decorator';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('quotes')
export class QuotesController {
  constructor(private quoteService: QuotesService) {}

  @Public()
  @Get()
  getQuotes(@Query('page') page: number, @Query('pageSize') pageSize: number) {
    return this.quoteService.findAll(page, pageSize);
  }

  @Get('/my')
  getMyQuotes(
    @Query('page') page: number,
    @Query('pageSize') pageSize: number,
    @Req() req: Request,
  ) {
    const user = req.user as User;
    return this.quoteService.findMyAll(page, pageSize, user.profile.id);
  }

  @Public()
  @Get(':id')
  getQuoteById(@Param('id', ParseIntPipe) idQuote: number) {
    return this.quoteService.findById(idQuote);
  }

  @Get('cancel/:id')
  cancelQuoteById(
    @Param('id', ParseIntPipe) idQuote: number,
    @Req() req: Request,
  ) {
    const user = req.user as User;
    return this.quoteService.cancelQuote(idQuote, user.profile.id);
  }

  @Public()
  @Get('attachment/:id')
  getQuoteByAttachment(@Param('id', ParseIntPipe) idAttachment: number) {
    return this.quoteService.findByAttachment(idAttachment);
  }

  @Public()
  @Post()
  createQuote(@Body() payload: CreateQuoteDto) {
    return this.quoteService.create(payload);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateQuoteDto,
    @Req() req: Request,
  ) {
    const user = req.user as User;
    return this.quoteService.update(id, payload);
  }
}

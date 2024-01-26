import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseGuards,
  Req,
} from '@nestjs/common';
import { ParseIntPipe } from 'src/common/parse-int-pipe.pipe';
import { CreateResponseQuoteDto } from '../dtos/responseQuote.dto';
import { ResponsesQuoteService } from '../services/responses-quote.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Public } from 'src/auth/decorators/public.decorator';
import { Request } from 'express';
import { User } from 'src/auth/entities/user.entity';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('responses-quote')
export class ResponsesQuoteController {
  constructor(private respQuoteService: ResponsesQuoteService) {}

  @Public()
  @Get()
  getAllResponses() {
    return this.respQuoteService.findAll();
  }
  @Get('quote/:quote')
  getByQuote(@Param('quote', ParseIntPipe) quoteId: number) {
    return this.respQuoteService.findByQuote(quoteId);
  }

  @Get(':id')
  getResponseId(@Param('id', ParseIntPipe) idRes: number) {
    return this.respQuoteService.findById(idRes);
  }

  @Get('acepted/:id')
  aceptedResponse(@Param('id', ParseIntPipe) idRes: number) {
    return this.respQuoteService.aceptedResponse(idRes);
  }

  @Post()
  createReponseQuote(
    @Body() payload: CreateResponseQuoteDto,
    @Req() req: Request,
  ) {
    const user = req.user as User;
    return this.respQuoteService.create(payload, user.profile.id);
  }
}

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Profile } from 'src/marketplace/entities/profile.entity';
import { Repository } from 'typeorm';
import {
  CreateResponseQuoteDto,
  UpdateResponseQuoteDto,
} from '../dtos/responseQuote.dto';
import { Quote, QuoteStatus } from '../entitites/quote.entity';
import {
  ResponseQuote,
  ResponseStatus,
} from '../entitites/responseQuote.entity';
import * as request from 'supertest';
import { UpdateQuoteDto } from '../dtos/quote.dto';
import { log } from 'console';

@Injectable()
export class ResponsesQuoteService {
  constructor(
    @InjectRepository(ResponseQuote)
    private resQuoteRepo: Repository<ResponseQuote>,
    @InjectRepository(Quote) private quoteRepo: Repository<Quote>,
    @InjectRepository(Profile) private profileRepo: Repository<Profile>,
  ) {}

  findAll() {
    return this.resQuoteRepo.find();
  }

  findById(id) {
    return this.resQuoteRepo.findOne({
      where: { id: id },
      relations: ['author'],
    });
  }

  async aceptedResponse(idres) {
    const response = await this.resQuoteRepo.findOne({
      relations: ['requests'],
      where: { id: idres },
    });
    if (!response)
      throw new NotFoundException(`Response Quote #${idres} not found`);

    const quote = await this.quoteRepo.findOne({
      where: { id: response.requests.id },
    });

    if (!quote)
      throw new NotFoundException(`Quote #${response.requests.id} not found`);

    response.status = ResponseStatus.aproved;
    if (!quote.responsesAcepeted) {
      quote.responsesAcepeted = [];
    }
    quote.responsesAcepeted.push(response.id);
    quote.statusQuote = QuoteStatus.progress;

    await this.quoteRepo.save(quote);
    await this.resQuoteRepo.save(response);

    return this.resQuoteRepo.save(response);
  }

  async findByQuote(quoteid) {
    const responses = await this.resQuoteRepo
      .createQueryBuilder('response')
      .leftJoinAndSelect('response.author', 'author')
      .where('response.requestsId= :quoteid', { quoteid })
      .getMany();

    if (!responses) throw new NotFoundException(`Quote #${quoteid} not found`);

    return responses;
  }

  async create(data: CreateResponseQuoteDto, idProfile: number) {
    const newResPonse = this.resQuoteRepo.create(data);
    if (!data.requestsId)
      throw new NotFoundException(`Quote #${data.requestsId} not found`);
    const quote = await this.quoteRepo.findOne({
      where: { id: data.requestsId },
    });

    const profile = await this.profileRepo.findOne({
      where: {
        id: idProfile,
      },
    });

    if (!profile) {
      throw new NotFoundException(`Profile #${data.authorId} not found`);
    }

    if (!quote) {
      throw new NotFoundException(`Quote #${data.requestsId} not found`);
    }

    newResPonse.requests = quote;
    newResPonse.author = profile;
    return this.resQuoteRepo.save(newResPonse);
  }
}

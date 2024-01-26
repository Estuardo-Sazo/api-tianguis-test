import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from 'src/marketplace/entities/category.entity';
import { Profile } from 'src/marketplace/entities/profile.entity';
import { Repository } from 'typeorm';
import { CreateQuoteDto, UpdateQuoteDto } from '../dtos/quote.dto';
import { Quote } from '../entitites/quote.entity';

@Injectable()
export class QuotesService {
  constructor(
    @InjectRepository(Quote) private quoteRepo: Repository<Quote>,
    @InjectRepository(Profile) private profileRepo: Repository<Profile>,
    @InjectRepository(Category) private categoryRepo: Repository<Category>,
  ) {}

  async findAll(page = 1, pageSize = 10) {
    const skip = (page - 1) * pageSize;

    const [quotes, total] = await this.quoteRepo.findAndCount({
      relations: ['attachments', 'responses'],
      order: {
        id: 'DESC',
      },
      where: {
        activated: true,
      },
      skip,
      take: pageSize,
    });

    return {
      quotes,
      totalItems: total,
      currentPage: page,
      pageSize,
    };
  }

  async findMyAll(page = 1, pageSize = 10, id: number) {
    const skip = (page - 1) * pageSize;

    const [quotes, total] = await this.quoteRepo.findAndCount({
      relations: ['attachments', 'responses'],
      order: {
        id: 'DESC',
      },
      where: {
        activated: true,
        attachments: {
          id: id,
        },
      },
      skip,
      take: pageSize,
    });

    return {
      quotes,
      totalItems: total,
      currentPage: page,
      pageSize,
    };
  }

  findById(id: number) {
    return this.quoteRepo.findOne({
      where: { id: id, activated: true },
      relations: ['attachments', 'responses'],
    });
  }
  async cancelQuote(id: number, iduser: number) {
    const quote = await this.quoteRepo.findOne({
      where: { id: id, activated: true },
      relations: ['attachments'],
    });
    console.log(quote.attachments.id);

    if (iduser != quote.attachments.id) return false;
    const changes = {
      activated: false,
    };
    this.quoteRepo.merge(quote, changes);
    this.quoteRepo.save(quote);
    return true;
  }

  findByAttachment(id: number) {
    return this.quoteRepo.find({
      where: {
        attachments: {
          id: id,
        },
        activated: true,
      },
      relations: ['attachments', 'responses'],
    });
  }

  async create(data: CreateQuoteDto) {
    const newQuote = this.quoteRepo.create(data);
    if (data.categoriesIds) {
      const categories = await this.categoryRepo.findByIds(data.categoriesIds);
      newQuote.categories = categories;
    }

    if (!data.attachmentId)
      throw new NotFoundException(`Profile #${data.attachmentId} not found`);
    const profile = await this.profileRepo.findOne({
      where: {
        id: data.attachmentId,
      },
    });
    if (!profile) {
      throw new NotFoundException(`Profile #${data.attachmentId} not found`);
    }
    newQuote.attachments = profile;

    return this.quoteRepo.save(newQuote);
  }

  async update(id, changes: UpdateQuoteDto) {
    const quote = await this.quoteRepo.findOneBy({ id: id });
    if (changes.categoriesIds) {
      const categories = await this.categoryRepo.findByIds(
        changes.categoriesIds,
      );
      quote.categories = categories;
    }
    this.quoteRepo.merge(quote, changes);
    return this.quoteRepo.save(quote);
  }
}

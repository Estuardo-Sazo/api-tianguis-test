import { ApiProperty, PartialType } from '@nestjs/swagger';
import {
  IsArray,
  IsBoolean,
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
} from 'class-validator';
import {
  QuoteStatus,
  QuoteType,
  StatusProduct,
} from '../entitites/quote.entity';

export class CreateQuoteDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly title: string;

  @IsString()
  @ApiProperty()
  readonly description: string;

  @IsPositive()
  @ApiProperty()
  readonly price: number;

  @IsDate()
  @IsNotEmpty()
  @ApiProperty()
  readonly expiration: Date;

  @IsOptional()
  @IsPositive()
  @ApiProperty()
  readonly minPrice: number;

  @IsOptional()
  @IsPositive()
  @ApiProperty()
  readonly maxPrice: number;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  readonly locationId: number;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  readonly attachmentId: number;

  @IsString()
  @ApiProperty()
  readonly type: QuoteType;

  @IsString()
  @ApiProperty()
  readonly status: StatusProduct;

  @IsString()
  @IsOptional()
  @ApiProperty()
  readonly statusQuote: QuoteStatus;

  @IsPositive()
  @IsNotEmpty()
  @ApiProperty()
  readonly author: number;

  @IsOptional()
  @IsBoolean()
  @ApiProperty()
  readonly active: boolean;

  @IsArray()
  @IsOptional()
  @ApiProperty()
  readonly responsesIds: number[];

  @IsArray()
  @IsOptional()
  @ApiProperty()
  readonly categoriesIds: number[];

  @IsBoolean()
  @IsOptional()
  @ApiProperty()
  readonly activated: boolean;

  @IsArray()
  @IsOptional()
  @ApiProperty()
  readonly responsesAcepeted: number[];
}

export class UpdateQuoteDto extends PartialType(CreateQuoteDto) {}

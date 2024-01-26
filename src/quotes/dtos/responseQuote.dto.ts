import { ApiProperty, PartialType } from '@nestjs/swagger';
import {
  IsBoolean,
  IsDate,
  IsNotEmpty,
  IsOptional,
  IsPositive,
  IsString,
} from 'class-validator';
import { ResponseStatus } from '../entitites/responseQuote.entity';

export class CreateResponseQuoteDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly comment: string;

  @IsPositive()
  @IsNotEmpty()
  @ApiProperty()
  readonly price: number;

  @IsPositive()
  @IsNotEmpty()
  @ApiProperty()
  readonly attachments: number;

  @IsPositive()
  @IsOptional()
  @ApiProperty()
  readonly product: number;

  @IsDate()
  @IsNotEmpty()
  @ApiProperty()
  readonly expiration: Date;

  @IsString()
  @ApiProperty()
  readonly terms: string;

  @IsPositive()
  @IsNotEmpty()
  @ApiProperty()
  readonly requestsId: number;

  @IsPositive()
  @IsNotEmpty()
  @ApiProperty()
  readonly authorId: number;

  @IsString()
  @IsOptional()
  @ApiProperty()
  readonly status: ResponseStatus;

  @IsBoolean()
  @IsOptional()
  @ApiProperty()
  readonly active: boolean;

  @IsBoolean()
  @IsOptional()
  @ApiProperty()
  readonly activated: boolean;
}

export class UpdateResponseQuoteDto extends PartialType(
  CreateResponseQuoteDto,
) {}

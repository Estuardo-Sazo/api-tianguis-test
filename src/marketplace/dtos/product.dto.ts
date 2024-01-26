import { PartialType, ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
} from 'class-validator';
import { ProductStatus, ProductType } from '../entities/product.entity';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly name: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly description: string;

  @IsString()
  @ApiProperty()
  readonly status: ProductStatus;

  @IsString()
  @ApiProperty()
  readonly type: ProductType;

  @IsOptional()
  @IsString()
  @ApiProperty()
  readonly terms: string;

  @IsOptional()
  @IsString()
  @ApiProperty()
  readonly paymentTerms: string;

  @IsOptional()
  @ApiProperty()
  readonly oldPrice: number;

  @IsOptional()
  @ApiProperty()
  readonly price: number;

  @IsOptional()
  @ApiProperty()
  @IsPositive()
  readonly minPrice: number;

  @IsOptional()
  @IsPositive()
  @ApiProperty()
  readonly maxPrice: number;

  @IsOptional()
  @IsPositive()
  @ApiProperty()
  readonly warranty: number;

  @IsOptional()
  @IsNumber()
  @ApiProperty()
  profileId: number;

  @IsArray()
  @IsNotEmpty()
  @ApiProperty()
  readonly images: string[];

  @IsOptional()
  @IsString()
  @ApiProperty()
  readonly imagesUrl: string;

  @IsPositive()
  @IsOptional()
  @ApiProperty()
  readonly rating: number;

  @IsArray()
  @IsNotEmpty()
  @ApiProperty()
  readonly categoriesIds: number[];

  @IsBoolean()
  @IsOptional()
  @ApiProperty()
  readonly favorite: boolean;

  @IsBoolean()
  @IsOptional()
  @ApiProperty()
  readonly activated: boolean;
}

export class UpdateProductDto extends PartialType(CreateProductDto) {}

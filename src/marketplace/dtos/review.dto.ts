import { IsString, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class CreateReviewDto {
  @IsString()
  @IsNotEmpty()
  readonly content: string;

  @IsNumber()
  @IsNotEmpty()
  readonly rating: number;

  @IsNumber()
  @IsOptional()
  readonly profileId: number;

  @IsOptional()
  @IsString()
  readonly productId: string;
}

export class UpdateReviewDto {
  @IsString()
  @IsNotEmpty()
  readonly content: string;

  @IsNumber()
  @IsNotEmpty()
  readonly rating: number;
}

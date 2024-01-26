import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateFavoriteProductDto {
  @IsNotEmpty()
  readonly productId: string;
}

export class DeleteFavoriteProductDto {
  @IsNotEmpty()
  readonly productId: string;
}

export class UpdateFavoriteProductDto {
  @IsNotEmpty()
  readonly productId: string;
}

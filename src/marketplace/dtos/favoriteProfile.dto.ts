import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateFavoriteProfileDto {
  @IsNotEmpty()
  @IsNumber()
  readonly profileId: number;
}

export class DeleteFavoriteProfileDto {
  @IsNotEmpty()
  @IsNumber()
  readonly profileId: number;
}

export class UpdateFavoriteProfileDto {
  @IsNotEmpty()
  @IsNumber()
  readonly profileId: number;
}

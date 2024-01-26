import { ApiProperty, PartialType } from '@nestjs/swagger';
import {
  IsArray,
  IsBoolean,
  IsEmail,
  IsEmpty,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  IsUrl,
} from 'class-validator';
import { ProfileType } from '../entities/profile.entity';

export class CreateProfileDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly name: string;

  @IsString()
  @IsOptional()
  @ApiProperty()
  readonly description: string;

  @IsString()
  @ApiProperty()
  readonly phone: string;

  @IsString()
  @IsEmail()
  @ApiProperty()
  readonly publicEmail: string;

  @IsOptional()
  @IsString()
  @ApiProperty()
  readonly website: string;

  @IsOptional()
  @IsString()
  @ApiProperty()
  readonly address: string;

  @IsOptional()
  @IsString()
  @ApiProperty()
  readonly photo: string;

  @IsOptional()
  @ApiProperty()
  readonly rating: number;

  @IsOptional()
  @IsString()
  @ApiProperty()
  readonly type: ProfileType;

  @IsOptional()
  @ApiProperty()
  readonly sales: number;

  @IsOptional()
  @IsBoolean()
  @ApiProperty()
  readonly verified: boolean;

  @IsOptional()
  @IsArray()
  @ApiProperty()
  readonly locationIds: number[];

  @IsOptional()
  @IsBoolean()
  @ApiProperty()
  readonly favorite: boolean;

  @IsOptional()
  @IsNotEmpty()
  @IsNumber()
  @ApiProperty()
  readonly profileId: number;

  @IsBoolean()
  @IsOptional()
  @ApiProperty()
  readonly activated: boolean;
}

export class UpdateProfileDto extends PartialType(CreateProfileDto) {}

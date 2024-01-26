import { User } from 'src/auth/entities/user.entity';
import { Quote } from 'src/quotes/entitites/quote.entity';
import { ResponseQuote } from 'src/quotes/entitites/responseQuote.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Product } from './product.entity';
import { Review } from './review.entity';
import { FavoriteProduct } from './favoriteProduct.entity';
import { FavoriteProfile } from './favoriteProfile.entity';

export enum ProfileType {
  buyer = 'BUYER',
  seller = 'SELLER',
  employee = 'EMPLOYEE',
}

@Entity({ name: 'profiles' })
export class Profile {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'varchar', length: 500, default: '' })
  description: string;

  @Column({ type: 'varchar', length: 50 })
  phone: string;

  @Column({ type: 'varchar', length: 255, default: '' })
  publicEmail: string;

  @Column({ type: 'varchar', length: 255, default: '' })
  website: string;

  @Column({ type: 'varchar', length: 255, default: '' })
  address: string;

  @Column({ type: 'varchar', length: 255, default: '' })
  photo: string;

  @Column({ type: 'decimal', precision: 10, scale: 1, default: 0 })
  rating: number;

  @Column({
    type: 'enum',
    enum: ProfileType,
    default: ProfileType.buyer,
  })
  type: ProfileType;

  @Column({ default: 0 })
  sales: number;

  @Column('bool', { default: false })
  verified: boolean;

  @Column('simple-array', { nullable: true })
  locationIds: number[];

  @Column('bool', { default: false })
  favorite: boolean;

  @CreateDateColumn({
    type: 'timestamp',
  })
  createAt: Date;

  @UpdateDateColumn({
    type: 'timestamp',
  })
  updateAt: Date;

  @OneToOne(() => User, (user) => user.profile)
  user: User;

  @OneToMany(() => Quote, (quote) => quote.attachments)
  quotes: Quote[];

  @OneToMany(() => ResponseQuote, (response) => response.author)
  respQuotes: ResponseQuote[];

  @OneToMany(() => Product, (product) => product.profile)
  products: Product[];

  @OneToMany(() => Review, (review) => review.profile)
  reviews: Review[];

  @OneToMany(() => FavoriteProduct, (favorite) => favorite.author)
  favoriteProducts: FavoriteProduct[];

  @OneToMany(() => FavoriteProfile, (favorite) => favorite.author)
  favoriteProfiles: FavoriteProfile[];

  @Column('bool', { default: true })
  activated: boolean;
}

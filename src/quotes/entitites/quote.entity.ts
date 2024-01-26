import { IsNotEmpty } from 'class-validator';
import { Category } from 'src/marketplace/entities/category.entity';
import { Profile } from 'src/marketplace/entities/profile.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ResponseQuote } from './responseQuote.entity';

export enum QuoteType {
  product = 'PRODUCT',
  service = 'SERVICE',
}

export enum StatusProduct {
  new = 'NEW',
  used = 'USED',
  openBox = 'OPEN BOX',
  refubished = 'REFUBISHED',
}

export enum QuoteStatus {
  new = 'NEW',
  progress = 'In progress',
  openBox = 'OPEN BOX',
  finished = 'FINISHED',
}

@Entity()
export class Quote {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  title: string;

  @Column({ type: 'varchar', length: 500 })
  description: string;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  price: number;

  @Column({ type: 'datetime' })
  expiration: Date;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  minPrice: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  maxPrice: number;

  @Column()
  @IsNotEmpty()
  locationId: number;

  @IsNotEmpty()
  @ManyToOne(() => Profile, (profile) => profile.quotes)
  attachments: Profile;

  @Column({
    type: 'enum',
    enum: QuoteType,
    default: QuoteType.product,
  })
  type: QuoteType;

  @Column({
    type: 'enum',
    enum: StatusProduct,
    default: StatusProduct.new,
  })
  status: StatusProduct;

  @Column({
    type: 'enum',
    enum: QuoteStatus,
    default: QuoteStatus.new,
  })
  statusQuote: QuoteStatus;

  @Column('simple-array', { nullable: true })
  responsesAcepeted: number[];

  @Column()
  @IsNotEmpty()
  author: number;

  @Column({ type: 'bool', default: true })
  active: boolean;

  @CreateDateColumn({
    type: 'timestamp',
  })
  createAt: Date;

  @UpdateDateColumn({
    type: 'timestamp',
  })
  updateAt: Date;

  @OneToMany(() => ResponseQuote, (response) => response.requests)
  responses: ResponseQuote[];

  @ManyToMany(() => Category, (category) => category.products)
  categories: Category[];

  @Column('bool', { default: true })
  activated: boolean;
}

import { IsNotEmpty } from 'class-validator';
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
import { Category } from './category.entity';
import { Profile } from './profile.entity';
import { Review } from './review.entity';

export enum ProductStatus {
  new = 'NEW',
  used = 'USED',
  openBox = 'OPEN BOX',
}

export enum ProductType {
  product = 'PRODUCT',
  service = 'SERVICE',
}

@Entity({ name: 'products' })
export class Product {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'varchar', length: 500 })
  description: string;

  @Column({
    type: 'enum',
    enum: ProductStatus,
    default: ProductStatus.new,
  })
  status: ProductStatus;

  @Column({
    type: 'enum',
    enum: ProductType,
    default: ProductType.product,
  })
  type: ProductType;

  @Column({ type: 'varchar', length: 500, default: '' })
  terms: string;

  @Column({ type: 'varchar', length: 500, default: '' })
  paymentTerms: string;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  oldPrice: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  price: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  minPrice: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  maxPrice: number;

  @Column({ default: 0 })
  warranty: number;

  @IsNotEmpty()
  @ManyToOne(() => Profile, (profile) => profile.products)
  profile: Profile;

  @Column('simple-array', { nullable: true })
  images: string[];

  @Column({ type: 'decimal', precision: 10, scale: 1, default: 0 })
  rating: number;

  @ManyToMany(() => Category, (category) => category.products)
  /* @JoinTable({
    name: 'products_category',
    joinColumn: {
      name: 'product_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'category_id',
      referencedColumnName: 'id',
    },
  }) */
  categories: Category[];

  @OneToMany(() => Review, (review) => review.product)
  reviews: Review[];

  @Column('bool', { default: false })
  favorite: boolean;

  @Column('bool', { default: true })
  activated: boolean;

  @CreateDateColumn({
    type: 'timestamp',
  })
  createAt: Date;

  @UpdateDateColumn({
    type: 'timestamp',
  })
  updateAt: Date;
}

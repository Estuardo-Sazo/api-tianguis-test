import { Quote } from 'src/quotes/entitites/quote.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Product } from './product.entity';

@Entity({ name: 'categories' })
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'varchar', length: 500 })
  image: string;

  @ManyToMany(() => Product, (product) => product.categories)
  @JoinTable()
  products: Product;

  @ManyToMany(() => Quote, (quote) => quote.categories)
  @JoinTable()
  quotes: Quote;

  @CreateDateColumn({
    type: 'timestamp',
  })
  createAt: Date;

  @UpdateDateColumn({
    type: 'timestamp',
  })
  updateAt: Date;

  @Column('bool', { default: true })
  activated: boolean;
}

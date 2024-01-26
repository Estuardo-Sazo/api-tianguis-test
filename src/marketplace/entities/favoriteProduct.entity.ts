import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  Unique,
} from 'typeorm';
import { Product } from './product.entity';
import { Profile } from './profile.entity';

@Entity()
@Unique(['product', 'author'])
export class FavoriteProduct {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Product, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  product: Product;

  @ManyToOne(() => Profile, (profile) => profile.favoriteProducts, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  author: Profile;

  @CreateDateColumn({
    type: 'timestamp',
  })
  createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamp',
  })
  updatedAt: Date;
}

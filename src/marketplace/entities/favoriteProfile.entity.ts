import {
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';
import { Profile } from './profile.entity';

@Entity()
@Unique(['profile', 'author'])
export class FavoriteProfile {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Profile, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  profile: Profile;

  @ManyToOne(() => Profile, (profile) => profile.favoriteProfiles, {
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

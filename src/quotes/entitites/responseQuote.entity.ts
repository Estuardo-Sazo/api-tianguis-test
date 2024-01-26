import { IsNotEmpty } from 'class-validator';
import { Profile } from 'src/marketplace/entities/profile.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Quote } from './quote.entity';

export enum ResponseStatus {
  won = 'WON',
  lost = 'LOST',
  aborted = 'ABORTED',
  pending = 'PENDING',
  aproved = 'APROVED',
}

@Entity()
export class ResponseQuote {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 500 })
  comment: string;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  price: number;

  @Column()
  @IsNotEmpty()
  attachments: number;

  @Column({ nullable: true })
  product: number;

  @Column({ type: 'datetime' })
  expiration: Date;

  @Column({ type: 'varchar', length: 500 })
  terms: string;

  @ManyToOne(() => Quote, (quote) => quote.responses)
  requests: Quote;

  @ManyToOne(() => Profile, (profiles) => profiles.respQuotes)
  author: Profile;

  @Column({
    type: 'enum',
    enum: ResponseStatus,
    default: ResponseStatus.pending,
  })
  status: ResponseStatus;

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

  @Column('bool', { default: true })
  activated: boolean;
}

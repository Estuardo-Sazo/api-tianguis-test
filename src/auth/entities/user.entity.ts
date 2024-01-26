import { IsNotEmpty } from 'class-validator';
import { Profile } from 'src/marketplace/entities/profile.entity';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export enum UserRole {
  user = 'USER',
  admin = 'ADMIN',
}

export enum RegistrationMethod {
  local = 'LOCAL',
  google = 'GOOGLE',
  facebook = 'FACEBBOK',
}

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 250, unique: true })
  email: string;

  @Column({ type: 'varchar', length: 500, nullable: true })
  password: string;

  @Column({ type: 'varchar', length: 500 })
  fullName: string;

  @Column('bool', { default: true })
  isActive: boolean;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.user,
  })
  role: UserRole;

  @Column({
    type: 'enum',
    enum: RegistrationMethod,
    default: RegistrationMethod.local,
  })
  registrationMethod: RegistrationMethod;

  @IsNotEmpty()
  @OneToOne(() => Profile)
  @JoinColumn({ name: 'profile_Id' })
  profile: Profile;

  @CreateDateColumn({
    type: 'timestamp',
  })
  createAt: Date;

  @UpdateDateColumn({
    type: 'timestamp',
  })
  updateAt: Date;

  @BeforeInsert()
  checkielsBeforeInsert() {
    this.email = this.email.toLocaleLowerCase().trim();
  }
  @BeforeUpdate()
  checkielsBeforeUpdate() {
    this.checkielsBeforeInsert();
  }
}

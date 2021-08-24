import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import Give from './Give';

@Entity({ name: 'donors' })
export default class Donor {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToMany(() => Give, give => give.donor)
  gives: Give[];

  @Column({ length: 150 })
  name: string;

  @Column({ length: 150 })
  email: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Column({ default: false })
  alternate_email: boolean;

  @Column({ length: 250, nullable: true })
  encrypted_password: string;

  @Column({ length: 250, nullable: true })
  reset_password_token: string;

  @Column({ nullable: true })
  reset_password_sent_at: Date;

  @Column({ nullable: true })
  remember_created_at: Date;

  @Column({ nullable: true })
  sign_in_count: number;

  @Column({ nullable: true })
  current_sign_in_at: Date;

  @Column({ nullable: true })
  last_sign_in_at: Date;

  @Column({ length: 100, nullable: true })
  current_sign_in_ip: string;

  @Column({ length: 100, nullable: true })
  last_sign_in_ip: string;

  @Column({ length: 500, nullable: true })
  avatar: string;

  @Column({ type: 'text', nullable: true })
  bio: string;

  @Column({ length: 150, nullable: true })
  city: string;

  @Column({ length: 150, nullable: true })
  state: string;

  @Column({ length: 150, nullable: true })
  zip_code: string;

  @Column({ length: 150, nullable: true })
  gender_other: string;

  @Column({ length: 150, nullable: true })
  ethnicity_other: string;

  @Column({ length: 150, nullable: true })
  birthday: string;

  @Column({ length: 150, nullable: true })
  occupation: string;

  @Column({ length: 250, nullable: true })
  registration_token: string;

  @Column({ default: false })
  archived: boolean;

  @Column({ length: 250, nullable: true })
  description_first: string;

  @Column({ length: 150, nullable: true })
  movement_bg_color: string;

  @Column({ length: 250, nullable: true })
  description_current: string;

  @Column({ length: 250, nullable: true })
  description_previous: string;
}

import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'users' })
export default class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 150 })
  email: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

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
}

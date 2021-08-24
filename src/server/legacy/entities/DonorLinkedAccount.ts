import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'donor_linked_accounts' })
export default class DonorLinkedAccount {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  donor_id: number;

  @Column({ nullable: true })
  donor_account_id: number;

  @Column({ default: false })
  verified: boolean;

  @Column({ length: 250, nullable: true })
  email: string;

  @Column({ length: 500, nullable: true })
  token: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

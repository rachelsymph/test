import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import Donor from './Donor';
import Platform from './Platform';
import Recipient from './Recipient';

@Entity({ name: 'gives' })
export default class Give {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Donor, (donor) => donor.gives, { nullable: true })
  @JoinColumn({ name: 'donor_id' })
  donor: Donor;

  @ManyToOne(() => Recipient, (recipient) => recipient.gives, {
    nullable: true,
  })
  @JoinColumn({ name: 'recipient_id' })
  recipient: Donor;

  @ManyToOne(() => Platform, (platform) => platform.gives, { nullable: true })
  @JoinColumn({ name: 'platform_id' })
  platform: Platform;

  @Column({ nullable: true })
  donor_id: number;

  @Column({ nullable: true })
  recipient_id: number;

  @Column({ nullable: true })
  platform_id: number;

  @Column({ length: 150, nullable: true })
  from_name: string;

  @Column({ length: 150, nullable: true })
  from_email: string;

  @Column({ length: 250, nullable: true })
  subject: string;

  @Column({ type: 'text', nullable: true })
  html_body: string;

  @Column({ type: 'text', nullable: true })
  text_body: string;

  @Column({ type: 'text', nullable: true })
  headers: string[];

  @Column({ type: 'text', nullable: true })
  attachments: string[];

  @Column({ length: 150, nullable: true })
  status: string;

  @Column({ nullable: true })
  process_dt: Date;

  @Column({ nullable: true })
  process_user_id: number;

  @Column({ nullable: true })
  give_dt: Date;

  @Column({ length: 150, nullable: true })
  timezone: string;

  @Column({ nullable: true })
  amount: number;

  @Column({ length: 150, nullable: true })
  tax_deductible: string;

  @Column({ default: false })
  recurring: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Column({ length: 100, nullable: true })
  unit: string;

  @Column({ default: false })
  archived: boolean;

  @Column({ length: 500, nullable: true })
  detail_entry: string;

  @Column({ type: 'decimal', nullable: true })
  split_amount: number;

  @Column({ type: 'decimal', nullable: true })
  split_tax_deductible: number;

  @Column({ length: 100, nullable: true })
  split_unit: string;

  @Column({ length: 100, nullable: true })
  split_type: string;

  @Column({ length: 200, nullable: true })
  frequency: string;

  @Column({ nullable: true })
  give_count_total: number;

  @Column({ nullable: true })
  give_count: number;

  @Column({ nullable: true })
  start_date: Date;

  @Column({ nullable: true })
  end_date: Date;

  @Column({ default: false, nullable: true })
  featured: boolean;

  @Column({ type: 'text', nullable: true })
  raw_data: string;
}

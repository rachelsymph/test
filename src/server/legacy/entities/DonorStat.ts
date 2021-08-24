import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'donor_stats' })
export default class DonorStat {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 250, nullable: true })
  year: string;

  @Column({ length: 250, nullable: true })
  month: string;

  @Column({ nullable: true })
  amount_total_hours: number;

  @Column({ nullable: true })
  amount_total_dollars: number;

  @Column({ nullable: true })
  donor_id: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Column({ type: 'text', nullable: true })
  gives: string[];
}

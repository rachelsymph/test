import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'platform_stats' })
export default class PlatformStat {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  donor_count: number;

  @Column({ nullable: true })
  gives_count: number;

  @Column({ nullable: true })
  gives_total_amount: number;

  @Column({ nullable: true })
  gives_total_amount_avg: number;

  @Column({ nullable: true })
  gives_total_amount_med: number;

  @Column({ nullable: true })
  gives_avg_months: number;

  @Column({ nullable: true })
  goals_count: number;

  @Column({ nullable: true })
  goals_amount: number;

  @Column({ nullable: true })
  goals_amount_med: number;

  @Column({ nullable: true })
  goals_amount_avg: number;

  @Column({ nullable: true })
  other_gives_count: number;

  @Column({ nullable: true })
  other_gives_count_avg: number;

  @Column({ nullable: true })
  other_gives_count_med: number;

  @Column({ type: 'text', nullable: true })
  other_gives_top_recipients_by_amount: string[];

  @Column({ type: 'text', nullable: true })
  other_gives_top_recipients_by_count: string[];

  @Column({ type: 'text', nullable: true })
  other_gives_top_platforms: string[];

  @Column({ nullable: true })
  platform_id: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

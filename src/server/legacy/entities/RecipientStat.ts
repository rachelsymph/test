import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'recipient_stats' })
export default class RecipientStat {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 250, nullable: true })
  year: string;

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
  recurring_gives_count: number;

  @Column({ nullable: true })
  recurring_gives_count_avg: number;

  @Column({ nullable: true })
  recurring_gives_count_med: number;

  @Column({ nullable: true })
  gives_top_recipients_by_amount: string[];

  @Column({ nullable: true })
  gives_top_recipients_by_count: string[];

  @Column({ nullable: true })
  gives_top_platforms: string[];

  @Column({ nullable: true })
  gives_graph_data: string[];

  @Column({ nullable: true })
  recipient_id: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

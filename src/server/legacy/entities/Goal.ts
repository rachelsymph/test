import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'goals' })
export default class Goal {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  income: number;

  @Column({ nullable: true })
  amount: number;

  @Column({ length: 250, nullable: true })
  year: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Column({ nullable: true })
  setter_id: number;

  @Column({ length: 250, nullable: true })
  setter_type: string;

  @Column({ default: false })
  archived: boolean;
}

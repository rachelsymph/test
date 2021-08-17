import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'moments' })
export default class Moment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 350, nullable: true })
  name: string;

  @Column({ nullable: true })
  flag: number;

  @Column({ nullable: true })
  moment_date: Date;

  @Column({ nullable: true })
  donor_id: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Column({ default: false })
  featured: boolean;
}

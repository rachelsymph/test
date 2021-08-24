import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'organizations' })
export default class Organization {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 350, nullable: true })
  name: string;

  @Column({ length: 350, nullable: true })
  role: string;

  @Column({ length: 350, nullable: true })
  website: string;

  @Column({ nullable: true })
  start_date: Date;

  @Column({ nullable: true })
  end_date: Date;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Column({ length: 350, nullable: true })
  title: string;

  @Column({ nullable: true })
  donor_id: number;
}

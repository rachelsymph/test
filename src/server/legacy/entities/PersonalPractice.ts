import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'personal_practices' })
export default class PersonalPractice {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 500, nullable: true })
  quote: string;

  @Column({ nullable: true })
  donor_id: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Column({ length: 250, nullable: true })
  status: string;

  @Column({ nullable: true })
  established_date: Date;
}

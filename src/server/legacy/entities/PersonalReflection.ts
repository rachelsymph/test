import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'personal_reflections' })
export default class PersonalReflection {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 500, nullable: true })
  message: string;

  @Column({ type: 'text', nullable: true })
  prompts: string[];

  @Column({ nullable: true })
  donor_id: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Column({ nullable: true })
  established_date: Date;
}

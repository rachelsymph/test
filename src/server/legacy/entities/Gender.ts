import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'genders' })
export default class Gender {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 350, nullable: true })
  name: string;

  @Column({ nullable: true })
  sort_order: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

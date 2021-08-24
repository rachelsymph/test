import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'ethnicities' })
export default class Ethnicity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  donor_id: number;

  @Column({ length: 250, nullable: true })
  name: string;

  @Column({ nullable: true })
  sort_order: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

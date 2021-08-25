import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'donor_ethnicities' })
export default class DonorEthnicity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  donor_id: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Column({ length: 500, nullable: true })
  specifics: string;
}

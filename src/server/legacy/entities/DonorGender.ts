import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'donor_genders' })
export default class DonorGender {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  donor_id: number;

  @Column({ nullable: true })
  gender_id: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

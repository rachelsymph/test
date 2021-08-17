import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'donor_groups' })
export default class DonorGroup {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  donor_id: number;

  @Column({ nullable: true })
  group_id: number;

  @Column({ default: false })
  admin: boolean;

  @Column({ default: false })
  accepted: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Column({ length: 500, nullable: true })
  types: string[];

  @Column({ length: 500, nullable: true })
  roles: string[];

  @Column({ length: 500, nullable: true })
  tags: string[];

  @Column({ type: 'text', nullable: true })
  note: string;
}

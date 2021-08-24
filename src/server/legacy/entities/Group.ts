import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'groups' })
export default class Group {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 350, nullable: true })
  name: string;

  @Column({ length: 500, nullable: true })
  logo: string;

  @Column({ type: 'text', nullable: true })
  purpose: string;

  @Column({ length: 100, nullable: true })
  zip_code: string;

  @Column({ length: 350, nullable: true })
  website: string;

  @Column({ length: 250, nullable: true })
  goal: string;

  @Column({ nullable: true })
  tax_types: number;

  @Column({ nullable: true })
  give_types: number;

  @Column({ nullable: true })
  status: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Column({ default: false })
  archived: boolean;

  @Column({ nullable: true })
  group_type: number;

  @Column({ length: 250, nullable: true })
  group_type_other: string;

  @Column({ length: 250, nullable: true })
  city: string;

  @Column({ length: 250, nullable: true })
  state: string;
}

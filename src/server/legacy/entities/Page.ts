import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'pages' })
export default class Page {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  owner_id: number;

  @Column({ length: 350, nullable: true })
  owner_type: string;

  @Column({ default: false })
  visible: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Column({ length: 350, nullable: true })
  background: string;

  @Column({ type: 'text', nullable: true })
  quotes: string;

  @Column({ length: 350, nullable: true })
  name: string;

  @Column({ nullable: true })
  style: number;

  @Column({ length: 350, nullable: true })
  logo: string;

  @Column({ type: 'text', nullable: true })
  descriptive_style: string;

  @Column({ length: 250, nullable: true })
  simple_style: string;
}

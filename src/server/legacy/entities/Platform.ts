import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import Give from './Give';

@Entity({ name: 'platforms' })
export default class Platform {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 150 })
  name: string;

  @Column({ length: 350 })
  website: string;

  @Column({ length: 100 })
  platform_type: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @OneToMany(() => Give, give => give.platform)
  gives: Give[];

  @Column({ default: false })
  archived: boolean;

  @Column({ length: 100, nullable: true })
  slug: string;

  @Column({ length: 100, nullable: true })
  domain_name: string;

  @Column({ length: 100 })
  platform_company_type: string;

  @Column({ length: 100 })
  platform_status_type: string;

  @Column({ default: false })
  is_syncing: boolean;

  @Column({ nullable: true })
  last_sync_date: Date;
}

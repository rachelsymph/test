import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import Give from './Give';


@Entity({ name: 'recipients' })
export default class Recipient {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 150 })
  name: string;

  @Column({ length: 250 })
  website: string;

  @Column({ length: 100 })
  taxid: string;

  @Column({ length: 100, nullable: true })
  recipient_type: string;

  @Column({ nullable: true })
  parent_recipient_id: number;

  @OneToMany(() => Give, (give) => give.recipient)
  gives: Give[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Column({ default: false })
  archived: boolean;

  @Column({ length: 100, nullable: true })
  slug: string;

  @Column({ length: 100, nullable: true })
  email: string;

  @Column({ length: 150, nullable: true })
  encrypted_password: string;

  @Column({ nullable: true })
  current_sign_in_at: Date;

  @Column({ nullable: true })
  last_sign_in_at: Date;

  @Column({ length: 100, nullable: true })
  current_sign_in_ip: string;

  @Column({ length: 100, nullable: true })
  last_sign_in_ip: string;

  @Column({ nullable: true })
  sign_in_count: number;

  @Column({ nullable: true })
  remember_created_at: Date;

  @Column({ length: 150, nullable: true })
  reset_password_token: string;

  @Column({ length: 150, nullable: true })
  reset_password_sent_at: string;

  @Column({ length: 200, nullable: true })
  og_title: string;

  @Column({ length: 500, nullable: true })
  og_description: string;

  @Column({ nullable: true })
  guidestar_org_id: number;

  @Column({ nullable: true })
  created_by: string;

  @Column({ length: 100, nullable: true })
  adjective: string;

  @Column({ length: 100, nullable: true })
  domain_name: string;

  @Column({ default: false })
  is_syncing: boolean;

  @Column({ nullable: true })
  last_sync_date: Date;
}

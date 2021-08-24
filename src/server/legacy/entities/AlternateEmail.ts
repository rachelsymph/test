import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'alternate_emails' })
export default class AlternateEmail {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: false })
  verified: boolean;

  @Column({ length: 250, nullable: true })
  email: string;

  @Column({ nullable: true })
  donor_id: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Column({ length: 500, nullable: true })
  token: string;

  @Column({ nullable: true })
  expiry: Date;

  @Column({ default: false })
  is_primary: boolean;
}

import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'page_recipients' })
export default class PageRecipient {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  page_id: number;

  @Column({ nullable: true })
  recipient_id: number;

  @Column({ default: false })
  highlighted: boolean;

  @Column({ length: 350, nullable: true })
  comment: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Column({ nullable: true })
  order: number;

  @Column({ nullable: true })
  image_id: number;
}

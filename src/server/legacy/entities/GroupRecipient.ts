import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'group_recipients' })
export default class GroupRecipient {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  recipient_id: number;

  @Column({ nullable: true })
  group_id: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

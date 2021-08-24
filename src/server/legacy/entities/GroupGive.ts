import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'group_gives' })
export default class GroupGive {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  group_id: number;

  @Column({ nullable: true })
  give_id: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

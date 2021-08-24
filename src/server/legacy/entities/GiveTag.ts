import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'give_tags' })
export default class GiveTag {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  give_id: number;

  @Column({ nullable: true })
  tag_id: number;
}

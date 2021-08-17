import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'friendly_id_slugs' })
export default class FriendlyIdSlug {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 350, nullable: true })
  slug: string;

  @Column({ nullable: true })
  sluggable_id: string;

  @Column({ length: 250, nullable: true })
  sluggable_type: string;

  @Column({ length: 250, nullable: true })
  scope: string;

  @CreateDateColumn()
  created_at: Date;
}

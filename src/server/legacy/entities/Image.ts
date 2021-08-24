import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'images' })
export default class Image {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  owner_id: number;

  @Column({ length: 250, nullable: true })
  owner_type: string;

  @Column({ length: 350, nullable: true })
  file: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Column({ length: 500, nullable: true })
  file_hash: string;

  @Column({ default: false })
  is_from_guidestar: boolean;

  @Column({ default: false })
  is_primary_logo: boolean;
}

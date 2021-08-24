import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'platform_recipient_regexes' })
export default class PlatformRecipientRegex {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  platform_id: number;

  @Column({ length: 250 })
  regex: string;
}

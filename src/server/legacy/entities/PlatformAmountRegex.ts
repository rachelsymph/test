import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';


@Entity({ name: 'platform_amount_regexes' })
export default class PlatformAmountRegex {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true, })
  platform_id: number;

  @Column({ length: 250 })
  regex: string;
}

import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Property {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  name: string;

  @Column({ nullable: true })
  address: string;

  @Column({ nullable: true })
  latitude: string;

  @Column({ nullable: true })
  longitude: string;

  @Column({ nullable: true })
  hosteltype: string;

  @Column({ nullable: true })
  roomtype: string;

  @Column('decimal', { nullable: true })
  pricepermonth: number;

  @Column('int', { nullable: true })
  availableunits: number;

  @Column('text', { nullable: true })
  amenities: string[];

  @Column('text', { nullable: true })
  otherofferings: string[];

  @Column('text', { nullable: true })
  imageurls: string[];
}
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
  hostelType: string;

  @Column({ nullable: true })
  roomType: string;

  @Column('decimal', { nullable: true })
  pricePerMonth: number;

  @Column('int', { nullable: true })
  availableUnits: number;

  @Column('text', { nullable: true })
  amenities: string[];

  @Column('text', { nullable: true })
  otherOfferings: string[];

  @Column('text', { nullable: true })
  imageUrls: string[];
}
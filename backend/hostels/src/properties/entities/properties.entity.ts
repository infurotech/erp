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

  @Column({ nullable: true, name: 'hosteltype' })
  hostelType: string;

  @Column({ nullable: true, name: 'roomtype' })
  roomType: string;

  @Column('decimal', { nullable: true, name: 'pricepermonth' })
  pricePerMonth: number;

  @Column('int', { nullable: true, name: 'availableunits'  })
  availableUnits: number;

  @Column('text', { nullable: true })
  amenities: string[];

  @Column('text', { nullable: true, name: 'otherofferings' })
  otherOfferings: string[];

  @Column('text', { nullable: true, name: 'imageurls' })
  imageUrls: string[];
}
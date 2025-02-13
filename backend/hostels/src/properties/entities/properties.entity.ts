import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Property {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  address: string;

  @Column()
  latitude: string;

  @Column()
  longitude: string;

  @Column()
  hostelType: string;

  @Column()
  roomType: string;

  @Column('decimal')
  pricePerMonth: number;

  @Column('int')
  availableUnits: number;

  // @Column('text', { array: true })
  // amenities: string[];

  // @Column('text', { array: true })
  // otherOfferings: string[];

  // @Column('text', { array: true })
  // imageUrls: string[];
}
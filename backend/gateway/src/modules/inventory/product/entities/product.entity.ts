import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToMany } from "typeorm";

@Entity()
export class Product extends BaseEntity{
  @PrimaryGeneratedColumn() 
  id: number;
  @Column() 
  name: string;
  @Column() 
  sku: string;
  @Column() 
  type: string;
  @Column() 
  unit: string;
  @Column('numeric', {
    precision: 7,
    scale: 2
  })
  public price: number;
}
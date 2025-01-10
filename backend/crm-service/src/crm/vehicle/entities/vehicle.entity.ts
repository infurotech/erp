import { Customer } from "src/crm/customer/entities/customer.entity";
import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne, OneToMany } from "typeorm";

@Entity()
export class Vehicle extends BaseEntity{
  @PrimaryGeneratedColumn() 
  id: number;
  @Column() 
  registrationNumber: string;
  @Column() 
  brand: string;
  @Column() 
  make: string;
  @Column() 
  model: string;
  @Column() 
  colour: string;

  @ManyToOne(() => Customer, (customer) => customer.vehicles)
  customer: Customer
}
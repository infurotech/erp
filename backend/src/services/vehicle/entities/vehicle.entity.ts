import { Customer } from "src/services/customer/entities/customer.entity";
import { Job } from "src/services/job/entities/job.entity";
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

  @OneToMany(() => Job, (job) => job.vehicle)
  jobs: Job[]
}
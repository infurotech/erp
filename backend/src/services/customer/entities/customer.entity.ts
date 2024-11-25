import { Job } from "src/services/job/entities/job.entity";
import { Vehicle } from "src/services/vehicle/entities/vehicle.entity";
import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne, OneToMany } from "typeorm";

@Entity()
export class Customer extends BaseEntity{
  @PrimaryGeneratedColumn() 
  id: number;
  @Column() 
  firstName: string;
  @Column() 
  middleName: string;
  @Column() 
  lastName: string;
  @Column() 
  phone: string;
  @Column() 
  email: string;
  @Column() 
  uniqueId: string;

  @OneToMany(() => Vehicle, (vehicle) => vehicle.customer)
  vehicles: Vehicle[]

  @OneToMany(() => Job, (job) => job.customer)
  jobs: Job[]
}
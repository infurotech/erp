import { Customer } from "src/services/customer/entities/customer.entity";
import { JobItem } from "src/services/job-item/entities/job-item.entity";
import { User } from "src/services/user/entities/user.entity";
import { Vehicle } from "src/services/vehicle/entities/vehicle.entity";
import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne, OneToMany } from "typeorm";

@Entity()
export class Job extends BaseEntity{
  @PrimaryGeneratedColumn() 
  id: number;
  @Column() 
  number: string;
  @Column() 
  date: string;
  @Column() 
  status: string;

  @ManyToOne(() => Customer, (customer) => customer.jobs)
  customer: Customer

  @ManyToOne(() => Vehicle, (vehicle) => vehicle.jobs)
  vehicle: Vehicle

  @ManyToOne(() => User, (user) => user.assignedJobs)
  assignee: User

  @ManyToOne(() => User, (user) => user.managedJobs)
  manager: User

  @OneToMany(() => JobItem, (jobItem) => jobItem.job)
  jobItems: JobItem[]
}
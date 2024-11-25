import { Job } from "src/services/job/entities/job.entity";
import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToMany } from "typeorm";

@Entity()
export class User extends BaseEntity{
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
  password: string;
  @Column() 
  profileUrl: string;
  @Column() 
  locked: boolean;

  @OneToMany( () => Job, job => job.assignee )
  assignedJobs: Job[];

  @OneToMany( () => Job, job => job.manager )
  managedJobs: Job[];
}
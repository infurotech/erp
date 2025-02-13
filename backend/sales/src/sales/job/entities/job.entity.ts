import { JobItem } from "../../job-item/entities/job-item.entity";
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

  @OneToMany(() => JobItem, (jobItem) => jobItem.job)
  jobItems: JobItem[]
}
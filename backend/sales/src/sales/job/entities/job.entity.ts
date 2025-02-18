import { JobItem } from "../../job-item/entities/job-item.entity";
import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne, OneToMany } from "typeorm";
import { AuditedBaseEntity } from '@infuro/shared'
@Entity()
export class Job extends AuditedBaseEntity{
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
import { Job } from "../../job/entities/job.entity";
import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne } from "typeorm";

@Entity()
export class JobItem extends BaseEntity{
  @PrimaryGeneratedColumn() 
  id: number;
  @Column() 
  description: number;

  @Column('numeric', {
    precision: 7,
    scale: 2
  })
  public unitPrice: number;

  @Column() 
  qty: number;

  @Column('numeric', {
    precision: 7,
    scale: 2
  })
  public amount: number;

  @Column('numeric', {
    precision: 7,
    scale: 2
  })
  public discount: number;

  @Column('numeric', {
    precision: 7,
    scale: 2
  })
  public tax: number;

  @Column('numeric', {
    precision: 7,
    scale: 2
  })
  public totalAmount: number;

  @ManyToOne(() => Job, (job) => job.jobItems)
  job: Job
}
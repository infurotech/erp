import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToOne, OneToMany } from "typeorm";
import { Tenant } from "./tenant.host.entity";
import { Feature } from "./feature.host.entity";

@Entity()
export class Edition extends BaseEntity{
  @PrimaryGeneratedColumn() 
  id: number;
  @Column() 
  name: string;
  @Column() 
  description: string;
  @Column() 
  active: boolean;

  @OneToOne(() => Tenant, (tenant) => tenant.edition)
  tenants: Tenant[]

  @OneToMany(() => Feature, (feature) => feature.edition)
  features: Feature[]
}
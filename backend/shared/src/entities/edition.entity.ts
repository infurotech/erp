import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToOne, OneToMany } from "typeorm";
import { Tenant } from "./tenant.entity";
import { AuditedBaseEntity } from "../audit/audited.entity";

@Entity()
export class Edition extends AuditedBaseEntity {
  @Column() 
  name: string;
  @Column() 
  description: string;
  @Column() 
  active: boolean;

  // @OneToOne(() => Tenant, (tenant) => tenant.edition)
  // tenants: Tenant[]

  // @OneToMany(() => Feature, (feature) => feature.edition)
  // features: Feature[]
}
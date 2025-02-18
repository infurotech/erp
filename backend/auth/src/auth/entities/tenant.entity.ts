import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToMany, OneToOne } from "typeorm";
import { Edition } from "./edition.entity";
import { AuditedBaseEntity } from "@infuro/shared";

@Entity()
export class Tenant extends AuditedBaseEntity{
  @Column() 
  name: string;
  @Column() 
  connectionString: string;
  @Column() 
  active: boolean;
  
  @OneToOne(() => Edition, (edition) => edition.tenants)
  edition: Edition
}
import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToMany } from "typeorm";
import { AuditedBaseEntity } from "./audited";

@Entity()
export class Invite extends AuditedBaseEntity{
  @Column() 
  email: string;
  @Column()
  tenantId: string;
  @Column() 
  token: string;
  @Column() 
  expiryTime: Date;
}
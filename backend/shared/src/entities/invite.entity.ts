import { AuditedBaseEntity } from"../audit/audited.entity";
import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToMany } from "typeorm";

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
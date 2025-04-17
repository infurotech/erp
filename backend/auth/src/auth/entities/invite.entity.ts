import { AuditedBaseEntity } from "@infuro/shared";
import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToMany } from "@infuro/shared";

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
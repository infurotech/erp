import { AuditedBaseEntity } from "../audit/audited.entity";
import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToMany } from "typeorm";

@Entity()
export class App extends AuditedBaseEntity {
  @Column() 
  name: string;
  @Column() 
  clientId: string;
  @Column() 
  clientSecret: string;
  @Column() 
  tenantId: string;
  @Column()
  failedAttempts: string;
  @Column() 
  locked: boolean;
}
import { Entity, Column } from "typeorm";
import { AuditedBaseEntity } from "@infuro/shared";

@Entity()
export class Tenant extends AuditedBaseEntity{
  @Column() 
  name: string;
  @Column() 
  db_host: string;
  @Column() 
  db_port: string;
  @Column() 
  db_login: string;
  @Column() 
  db_password: string;
  @Column() 
  db_database: string;
  @Column()
  active: boolean;
}
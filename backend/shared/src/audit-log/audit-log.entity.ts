import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Action } from "./audit-log.enum";

@Entity({name:"AuditLogs"})
export class AuditLog extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  entity: string;

  @Column()
  entityId:string;

  @Column("json")
  before: object;

  @Column("json")
  after: object;

  @Column('enum', { enum: Action })
  action: Action;  

  @Column("varchar", { nullable: true })
  actor: string;

  @Column("varchar", { nullable: true })
  userIp: string;
}

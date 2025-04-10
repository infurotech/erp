import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToOne, ManyToOne } from "typeorm";
import { Edition } from "./edition.entity";
import { AuditedBaseEntity } from"../audit/audited.entity";

@Entity()
export class Feature extends AuditedBaseEntity{
  @Column() 
  name: string;
  @Column() 
  description: string;
  @Column() 
  active: boolean;

  // @ManyToOne(() => Edition, (edition) => edition.features)
  // edition: Edition
}
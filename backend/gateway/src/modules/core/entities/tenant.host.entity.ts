import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToMany, OneToOne } from "typeorm";
import { Edition } from "./edition.host.entity";

@Entity()
export class Tenant extends BaseEntity{
  @PrimaryGeneratedColumn() 
  id: number;
  @Column() 
  name: string;
  @Column() 
  connectionString: string;
  @Column() 
  active: boolean;
  
  @OneToOne(() => Edition, (edition) => edition.tenants)
  edition: Edition
}
import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToOne, ManyToOne } from "typeorm";
import { Edition } from "./edition.host.entity";

@Entity()
export class Feature extends BaseEntity{
  @PrimaryGeneratedColumn() 
  id: number;
  @Column() 
  name: string;
  @Column() 
  description: string;
  @Column() 
  active: boolean;

  @ManyToOne(() => Edition, (edition) => edition.features)
  edition: Edition
}
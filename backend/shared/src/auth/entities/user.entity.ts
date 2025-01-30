
import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne, OneToMany } from "typeorm";

@Entity()
export class User extends BaseEntity{
  @PrimaryGeneratedColumn() 
  id: number;
  @Column() 
  password: string;
  @Column() 
  firstName: string;
  @Column() 
  profileUrl: string;
  @Column()
  email: string;

}
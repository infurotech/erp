import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToMany } from "typeorm";

@Entity()
export class User extends BaseEntity{
  @PrimaryGeneratedColumn() 
  id: number;
  @Column() 
  firstName: string;
  @Column() 
  middleName: string;
  @Column() 
  lastName: string;
  @Column() 
  email: string;
  @Column({ default: 'default_password' })
  password: string;
  @Column({default: '' }) 
  profileUrl: string;
}
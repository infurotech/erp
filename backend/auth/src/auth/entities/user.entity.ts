import { AuditedBaseEntity, Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToMany } from "@infuro/shared";

@Entity()
export class User extends AuditedBaseEntity{
  @Column() 
  firstName: string;
  @Column() 
  middleName: string;
  @Column() 
  lastName: string;
  @Column() 
  phone: string;
  @Column() 
  email: string;
  @Column() 
  password: string;
  @Column() 
  profileUrl: string;
  @Column()
  failedAttempts: number;
  @Column() 
  locked: boolean;
}
import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToMany } from "typeorm";

@Entity()
export class AppPermissions extends BaseEntity{
  @PrimaryGeneratedColumn() 
  id: number;
  @Column() 
  appId: number;
  @Column() 
  tenantId: number;
  @Column() 
  permission: string;
}
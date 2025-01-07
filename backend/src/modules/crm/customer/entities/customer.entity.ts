import { Vehicle } from "../../vehicle/entities/vehicle.entity";
import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne, OneToMany } from "typeorm";

@Entity()
export class Customer extends BaseEntity{
  @PrimaryGeneratedColumn() 
  id: number;


  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column() 
  phone: string;

  @Column() 
  email: string;

  @OneToMany(() => Vehicle, (vehicle) => vehicle.customer)
  vehicles: Vehicle[]
}
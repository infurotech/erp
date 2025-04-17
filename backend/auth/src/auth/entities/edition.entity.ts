import { Tenant } from "@infuro/shared";
import { Feature } from "./feature.entity";
import { AuditedBaseEntity ,Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToOne, OneToMany} from "@infuro/shared";

@Entity()
export class Edition extends AuditedBaseEntity {
  @Column() 
  name: string;
  @Column() 
  description: string;
  @Column() 
  active: boolean;

  // @OneToOne(() => Tenant, (tenant) => tenant.edition)
  // tenants: Tenant[]

  // @OneToMany(() => Feature, (feature) => feature.edition)
  // features: Feature[]
}
import { Edition } from "./edition.entity";
import { AuditedBaseEntity ,Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToOne, ManyToOne} from "@infuro/shared";

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
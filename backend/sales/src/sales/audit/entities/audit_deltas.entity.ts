import { Entity,BaseEntity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('audit_deltas')
export class AuditDelta extends BaseEntity  {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  audit_id: number;

  @Column()
  property_name: string;

  @Column({ type: 'text', nullable: true })
  old_value: string;

  @Column({ type: 'text', nullable: true })
  new_value: string;

}
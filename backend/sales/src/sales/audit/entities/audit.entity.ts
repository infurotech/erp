import { Entity,BaseEntity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity('audit')
export class Audit extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  entity: string;

  @Column()
  operation: string;

  @Column('json')
  data: any;

  @CreateDateColumn()
  timestamp: Date;
}

import { CreateDateColumn, UpdateDateColumn, DeleteDateColumn, AfterLoad,PrimaryGeneratedColumn, BaseEntity, Column } from 'typeorm';

export abstract class AuditedBaseEntity extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;
  
    @Column({ type: 'uuid', nullable: true })
    createdBy: string;

    @CreateDateColumn({ type: 'timestamp' })
    createdAt: Date;
  
    @Column({ type: 'uuid', nullable: true })
    updatedBy: string;
  
    @UpdateDateColumn({ type: 'timestamp' })
    updatedAt: Date;

    @Column({default: false})
    deleted: boolean;
  
    @Column({ type: 'uuid', nullable: true })
    deletedBy: string;
    
    @DeleteDateColumn({ type: 'timestamp' })
    deletedAt: Date | null;
}

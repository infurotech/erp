import { CreateDateColumn, UpdateDateColumn, DeleteDateColumn, PrimaryGeneratedColumn, BaseEntity, Column } from 'typeorm';

export abstract class AuditedBaseEntity extends BaseEntity {

    @PrimaryGeneratedColumn('uuid')
    id: string;
  
    @Column({ type: 'uuid', nullable: true })
    createdBy: string; // Store the user ID

    @CreateDateColumn({ type: 'timestamptz' }) // Use timestamptz for time zone support
    createdAt: Date;
  
    @Column({ type: 'uuid', nullable: true })
    updatedBy: string; // Store the user ID
  
    @UpdateDateColumn({ type: 'timestamptz' }) // Use timestamptz for time zone support
    updatedAt: Date;

    @Column()
    deleted: boolean;
  
    @Column({ type: 'uuid', nullable: true })
    deletedBy: string; // Store the user ID
    
    @DeleteDateColumn({ type: 'timestamptz' }) // Use timestamptz for time zone support
    deletedAt: Date;
}
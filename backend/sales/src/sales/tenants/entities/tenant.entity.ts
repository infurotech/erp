import { Entity , Column,PrimaryGeneratedColumn, BaseEntity } from "typeorm";
@Entity()
export class Tenants extends BaseEntity {
    @PrimaryGeneratedColumn() 
    id: number;
    @Column() 
    tenantId: string;
    @Column() 
    encryptedConnection: string;
}


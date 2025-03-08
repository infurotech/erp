import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from "typeorm";

@Entity("companies")
export class Company {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({ type: "varchar", length: 255, unique: true })
    name: string;

    @Column({ type: "varchar", length: 100, nullable: true })
    industry: string;

    @Column({ type: "enum", enum: ["B2B", "B2C"], nullable: true })
    business_type: string;

    @Column({ type: "varchar", length: 255, nullable: true })
    website: string;

    @Column({ type: "boolean", nullable: true })
    is_deleted: boolean;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @Column({ type: "timestamp", nullable: true })
    deleted_at: Date;

    @Column({ type: "uuid", nullable: true })
    created_by: string;

    @Column({ type: "uuid", nullable: true })
    updated_by: string;

    @Column({ type: "uuid", nullable: true })
    deleted_by: string;
}

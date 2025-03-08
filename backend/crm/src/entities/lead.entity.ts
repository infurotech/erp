import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { ContactCompany } from "./contact-company.entity";

@Entity("leads")
export class Lead {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @ManyToOne(() => ContactCompany, { onDelete: "CASCADE" })
    contact_company: ContactCompany;

    @Column({ type: "enum", enum: ["New", "Contacted", "Qualified", "Proposal", "Negotiation", "Closed"], default: "New" })
    status: string;

    @Column({ type: "enum", enum: ["Product Inquiry", "Service Request", "Partnership", "Investment"], nullable: false })
    type: string;

    @Column({ type: "decimal", precision: 12, scale: 2, nullable: true })
    amount: number;

    @Column({ type: "varchar", length: 100, nullable: true })
    source: string;

    @Column({ type: "date", nullable: true })
    expected_close_date: Date;

    @Column({ type: "uuid", nullable: true })
    assigned_to: string; // Links to external User Microservice

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

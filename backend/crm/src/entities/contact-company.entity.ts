import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { Contact } from "./contact.entity";
import { Company } from "./company.entity";

@Entity("contact_company")
export class ContactCompany {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @ManyToOne(() => Contact, contact => contact.contactCompanies, { onDelete: "CASCADE" })
    contact: Contact;

    @ManyToOne(() => Company, { onDelete: "CASCADE" })
    company: Company;

    @Column({ type: "varchar", length: 100, nullable: true })
    job_title: string;

    @Column({ type: "varchar", length: 100, nullable: true })
    department: string;

    @Column({ type: "enum", enum: ["Decision Maker", "Influencer", "Employee", "Other"], nullable: true })
    role: string;

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

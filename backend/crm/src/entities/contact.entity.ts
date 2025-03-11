import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, ManyToMany, 
    JoinTable, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { Address } from "./address.entity";
import { Company } from "./company.entity";
import { ContactCompany } from "./contact-company.entity";
import { Tag } from "./tag.entity";
import { Note } from "./note.entity";

@Entity("contacts")
export class Contact {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({ type: "varchar", length: 100 })
    first_name: string;

    @Column({ type: "varchar", length: 100 })
    last_name: string;

    // Dynamic computed property (not stored in DB)
    get full_name(): string {
        return `${this.first_name} ${this.last_name}`.trim();
    }

    @Column({ type: "varchar", length: 20, nullable: true })
    salutation: string;

    @Column({ type: "enum", enum: ["Male", "Female", "Other"], nullable: true })
    gender: string;

    @Column({ type: "date", nullable: true })
    date_of_birth: Date;

    @Column({ type: "varchar", length: 255, unique: true })
    email: string;

    @Column({ type: "varchar", length: 255, unique: true, nullable: true })
    secondary_email: string;

    @Column({ type: "varchar", length: 20, unique: true, nullable: true })
    phone: string;

    @Column({ type: "varchar", length: 20, unique: true, nullable: true })
    mobile: string;

    @Column({ type: "varchar", length: 20, nullable: true })
    fax: string;

    @Column({ type: "varchar", length: 255, nullable: true })
    website: string;

    @Column({ type: "enum", enum: ["Email", "Phone", "SMS", "WhatsApp"], nullable: true })
    preferred_contact_method: string;

    @Column({ type: "enum", enum: ["New", "Contacted", "Qualified", "Converted", "Lost"], default: "New" })
    lead_status: string;

    @Column({ type: "enum", enum: ["Prospect", "Customer", "Partner", "Supplier"], nullable: true })
    relationship_status: string;

    @Column({ type: "varchar", length: 100, nullable: true })
    lead_source: string;

    // References to external user microservice (No FK constraint)
    @Column({ type: "uuid", nullable: true })
    contact_owner_id: string;

    @Column({ type: "uuid", nullable: true })
    assigned_to: string;

    @OneToMany(() => Address, address => address.contact)
    addresses: Address[];

    @OneToMany(() => ContactCompany, cc => cc.contact)
    contactCompanies: ContactCompany[];

    @ManyToMany(() => Tag, tag => tag.contacts)
    @JoinTable({ name: "contact_tags" })  // Ensures the correct join table name
    tags: Tag[];

    @OneToMany(() => Note, note => note.contact)
    notes: Note[];

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

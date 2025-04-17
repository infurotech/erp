import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { Contact } from "./contact.entity";

@Entity("addresses")
export class Address {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @ManyToOne(() => Contact, contact => contact.addresses, { onDelete: "CASCADE" })
    contact: Contact;

    @Column({ type: "enum", enum: ["Home", "Work", "Billing", "Shipping"], default: "Home" })
    address_type: string;

    @Column({ type: "varchar", length: 255, nullable: true })
    address_line1: string;

    @Column({ type: "varchar", length: 255, nullable: true })
    address_line2: string;

    @Column({ type: "varchar", length: 100, nullable: true })
    city: string;

    @Column({ type: "varchar", length: 100, nullable: true })
    state: string;

    @Column({ type: "varchar", length: 100, nullable: true })
    country: string;

    @Column({ type: "varchar", length: 20, nullable: true })
    postal_code: string;

    @Column({ type: "point", nullable: true })
    geo_location: string;

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

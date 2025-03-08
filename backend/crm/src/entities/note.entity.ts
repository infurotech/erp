import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { Contact } from "./contact.entity";

@Entity("notes")
export class Note {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @ManyToOne(() => Contact, contact => contact.notes, { onDelete: "CASCADE" })
    contact: Contact;

    @Column({ type: "text" })
    content: string;

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

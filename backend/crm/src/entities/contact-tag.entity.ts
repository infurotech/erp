import { Entity, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn, Column, UpdateDateColumn } from "typeorm";
import { Contact } from "./contact.entity";
import { Tag } from "./tag.entity";

@Entity("contact_tags")
export class ContactTag {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @ManyToOne(() => Contact, { onDelete: "CASCADE" })
    contact: Contact;

    @ManyToOne(() => Tag, { onDelete: "CASCADE" })
    tag: Tag;

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

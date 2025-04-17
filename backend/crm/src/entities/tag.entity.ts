import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { Contact } from "./contact.entity";

@Entity("tags")
export class Tag {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({ type: "varchar", length: 50, unique: true })
    name: string;

    @ManyToMany(() => Contact, contact => contact.tags)
    contacts: Contact[];

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

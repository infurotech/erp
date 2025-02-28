import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne, OneToMany } from "typeorm";
import { ScheduleStatus } from "./schedule-status";
import { ScheduleType } from "./schedule-type";

@Entity()
export class Schedule extends BaseEntity {
    
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    date: string;

    @Column({
        type: "enum",
        enum: ScheduleStatus,
        default: ScheduleStatus.Due
    })
    status: ScheduleStatus;

    @Column({
        type: "enum",
        enum: ScheduleType,
        default: ScheduleType.Onetime
    })
    type: ScheduleType;
}
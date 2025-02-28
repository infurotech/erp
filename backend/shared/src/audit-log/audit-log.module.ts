import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuditLog } from "./audit-log.entity";
import { AuditLogSubscriber } from "./audit-log.subscriber";

@Module({
    imports: [TypeOrmModule.forFeature([AuditLog])],
    providers: [ AuditLogSubscriber],
    exports: [AuditLogSubscriber]
})
export class AuditLogModule{}
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JobItem } from './job-item/entities/job-item.entity';
import { Job } from './job/entities/job.entity';
import { JobItemService } from './job-item/job-item.service';
import { JobService } from './job/job.service';
import { JobItemController } from './job-item/job-item.controller';
import { JobController } from './job/job.controller';
import { Repository , DataSource } from 'typeorm';
import { DatabaseService } from '@infuro/shared';
import { TenantsService } from './tenants/tenants.service';
import { TenantsController } from './tenants/tenants.controller';
import { Tenants } from './tenants/entities/tenant.entity';
import { Audit } from './audit/entities/audit.entity';
import { AuditDelta } from './audit/entities/audit_deltas.entity';
@Module({
  imports: [TypeOrmModule.forFeature([Job, JobItem,Tenants,Audit,AuditDelta])],
  providers: [JobItemService, JobService,TenantsService,Repository,
    {
    provide: DatabaseService,
    useFactory: (dataSource: DataSource) => new DatabaseService(dataSource),
    inject: [DataSource],
  }],
  exports: [JobItemService, JobService,TenantsService, DatabaseService],
  controllers: [JobController, JobItemController , TenantsController],
})
export class SalesModule {}

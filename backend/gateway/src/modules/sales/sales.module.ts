import { Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";

import { JobService } from './job/job.service';
import { Job } from './job/entities/job.entity';

import { JobItemService } from './job-item/job-item.service';
import { JobItem } from './job-item/entities/job-item.entity';
import { JobItemController } from './job-item/job-item.controller';
import { JobController } from './job/job.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Job, JobItem])],
  providers: [JobItemService, JobService],
  exports: [JobItemService, JobService],
  controllers: [JobController, JobItemController],
})
export class SalesModule {}

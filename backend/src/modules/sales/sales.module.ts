import { Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";

import { JobService } from './job/job.service';
import { JobController } from './job/job.controller';
import { Job } from './job/entities/job.entity';

import { JobItemService } from './job-item/job-item.service';
import { JobItemController } from './job-item/job-item.controller';
import { JobItem } from './job-item/entities/job-item.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Job, JobItem])],
  providers: [JobItemService, JobService],
  exports: [JobItemService, JobService],
  controllers: [JobController, JobItemController],
})
export class SalesModule {}

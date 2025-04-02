import { Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";

// import { JobService } from './job/job.service';
// import { JobController } from './job/job.controller';
// import { Job } from './job/entities/job.entity';

// import { JobItemService } from './job-item/job-item.service';
// import { JobItemController } from './job-item/job-item.controller';
// import { JobItem } from './job-item/entities/job-item.entity';
import { BullModule } from './bull/bull.module';  // Import BullModule to use queues
import { JobProcessor } from '../job.processor';  // Import the JobProcessor
import { BullBoardService } from './bull-board/bull-board.service'; // Import the service

@Module({
  imports: [BullModule],
  providers: [JobProcessor,BullBoardService],
  exports: [],
  controllers: [ ],
})
export class SalesModule {}
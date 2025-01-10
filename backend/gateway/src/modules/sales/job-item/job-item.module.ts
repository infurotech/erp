import { Module } from '@nestjs/common';
import { JobItemService } from './job-item.service';
import { JobItem } from './entities/job-item.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JobItemController } from './job-item.controller';

@Module({
  imports: [TypeOrmModule.forFeature([JobItem])],
  exports: [JobItemService],
  controllers: [JobItemController],
  providers: [JobItemService],
})
export class JobItemModule {}

import { Module } from '@nestjs/common';
import { JobItemService } from './job-item.service';
import { JobItemController } from './job-item.controller';
import { JobItem } from './entities/job-item.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GeneralService } from '../general/general.service';
import { getRepositoryToken } from '@nestjs/typeorm';
@Module({
  imports: [TypeOrmModule.forFeature([JobItem])],
  exports: [JobItemService],
  controllers: [JobItemController],
  providers: [JobItemService,{
    provide : "JobItem_Service",
    useFactory : (JobItemRepository)=> new GeneralService<JobItem>(JobItemRepository),
    inject : [getRepositoryToken(JobItem)],
  }],

})
export class JobItemModule {}

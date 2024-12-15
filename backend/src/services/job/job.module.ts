import { Module } from '@nestjs/common';
import { JobService } from './job.service';
import { JobController } from './job.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Job } from './entities/job.entity';
import { GeneralService } from '../general/general.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { GeneralModule } from '../general/general.module';
@Module({
  imports: [TypeOrmModule.forFeature([Job]),
   GeneralModule.forRepository(Job)],
  exports: [JobService],
  providers: [JobService,{
    provide : "Job_Service",
    useFactory : (JobsRepository)=> new GeneralService<Job>(JobsRepository),
    inject : [getRepositoryToken(Job)],
  }],
  controllers: [JobController],
})
export class JobModule {}

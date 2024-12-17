import { Controller, Get } from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';

import { Job } from './entities/job.entity';
import { JobService } from './job.service';

@Crud({
  model: {
    type: Job,
  },
  query: {
    join: {
      vehicle: {
        eager: true,
      },
      manager: {
        eager: true,
        exclude: ['password'],
      },
      assignee: {
        eager: true,
        exclude: ['password'],
      },
    },
  },
})
@Controller('jobs')
export class JobController implements CrudController<Job> {
  constructor(public readonly jobService: JobService) {
    this.service = jobService; 
  }

  service: JobService;

  // Custom route
  @Get('hello') // Custom endpoint
  getHello(): any {
    return this.jobService.test();
  }
}

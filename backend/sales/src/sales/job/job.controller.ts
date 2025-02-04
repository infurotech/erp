import { Controller } from '@nestjs/common';
import { Crud, CrudController} from '@nestjsx/crud';

import { Job } from './entities/job.entity';
import { JobService } from './job.service';
import { Audit } from '@packages/common';

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
@Audit()
@Controller('jobs')
export class JobController implements CrudController<Job> {
  service: JobService;
  constructor(public jobService: JobService) {
    this.service = jobService
  }
}
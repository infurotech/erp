import { Controller , Delete , Param , Body } from '@nestjs/common';
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
  constructor(public service: JobService) {}

  @Delete(':id')
  async deleteJob(@Param('id') id:number) {
    this.service.softDelete(id);
  }
}
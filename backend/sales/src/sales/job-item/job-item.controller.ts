import { Controller } from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';
import { JobItem } from './entities/job-item.entity';
import { JobItemService } from './job-item.service';
 
@Crud({
  model: {
    type: JobItem
  }
})
@Controller('job-items')
export class JobItemController implements CrudController<JobItem> {
  constructor(public service: JobItemService) {}
 
}
import { Controller } from "@nestjs/common";
import { Crud, CrudController, CrudService } from "@nestjsx/crud";

import { JobItem } from "./entities/job-item.entity";
import { JobItemService } from "./job-item.service";
import { Audit } from "@packages/common";

@Crud({
  model: {
    type: JobItem,
  },
})
@Audit()
@Controller("job-items")
export class JobItemController implements CrudController<JobItem> {
  service: JobItemService;
  constructor(public jobItemservice: JobItemService) {
    this.service = jobItemservice;
  }
}
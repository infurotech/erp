import { Injectable, Scope } from "@nestjs/common";

import { JobItem } from "./entities/job-item.entity";
import { CrudService } from "@packages/common";

@Injectable({ scope: Scope.REQUEST })
export class JobItemService extends CrudService<JobItem> {
  async initRepo(req: Request) {
    await this.initTenantRepository(req, JobItem);
  }
}
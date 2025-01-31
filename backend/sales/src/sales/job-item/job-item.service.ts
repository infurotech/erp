import { Injectable } from "@nestjs/common";

import { JobItem } from "./entities/job-item.entity";
import { CrudService } from "@shared/database";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class JobItemService extends CrudService<JobItem> {
  async initRepo(req: Request) {
    await this.initTenantRepository(req, JobItem);
  }
}
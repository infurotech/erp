import { Injectable, Scope } from "@nestjs/common";

import { JobItem } from "./entities/job-item.entity";
import { CrudService, DatabaseService } from "@packages/common";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable({ scope: Scope.REQUEST })
export class JobItemService extends CrudService<JobItem> {

  constructor(@InjectRepository(JobItem) repo,databaseService: DatabaseService) {
    super(repo,databaseService);
  }
}
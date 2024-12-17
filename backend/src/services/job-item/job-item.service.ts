import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { TypeOrmCrudService } from "@nestjsx/crud-typeorm";
import { CoreService } from "../core/core.service";

import { JobItem } from "./entities/job-item.entity";

@Injectable()
export class JobItemService extends CoreService<JobItem> {
  constructor(@InjectRepository(JobItem) repo) {
    super(repo);
  }
}
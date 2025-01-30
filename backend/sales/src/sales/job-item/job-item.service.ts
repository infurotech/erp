import { Injectable } from "@nestjs/common";

import { JobItem } from "./entities/job-item.entity";
import { CrudService } from "@shared/crud/crud.service";
import { Repository } from "../../../../shared/node_modules/typeorm"
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class JobItemService extends CrudService<JobItem> {
  constructor(@InjectRepository(JobItem) repo:Repository<JobItem>) {
    super(repo);
  }
}
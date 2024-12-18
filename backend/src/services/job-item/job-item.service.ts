import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";

import { JobItem } from "./entities/job-item.entity";
import { CrudService } from "../crud/crud.service";

@Injectable()
export class JobItemService extends CrudService<JobItem> {
  constructor(@InjectRepository(JobItem) repo) {
    super(repo);
  }
}
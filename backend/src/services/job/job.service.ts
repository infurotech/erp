import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { TypeOrmCrudService } from "@nestjsx/crud-typeorm";

import { Job } from "./entities/job.entity";

@Injectable()
export class JobService extends TypeOrmCrudService<Job> {
  constructor(@InjectRepository(Job) repo) {
    super(repo);
  }
}
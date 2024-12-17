import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { TypeOrmCrudService } from "@nestjsx/crud-typeorm";
import { CoreService } from "../core/core.service";
import { Job } from "./entities/job.entity";

@Injectable()
export class JobService extends CoreService<Job> {
  constructor(@InjectRepository(Job) repo) {
    super(repo);
  }

  test()
  {
    console.log("test called")
    return this.findAllWithPagination(1,2)
  }
}

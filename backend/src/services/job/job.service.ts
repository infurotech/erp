import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Job } from "./entities/job.entity";
import { CrudService } from "src/core/crud/crud.service";

@Injectable()
export class JobService extends CrudService<Job> {
  constructor(@InjectRepository(Job) repo) {
    super(repo);
  }
}

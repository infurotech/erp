import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { TypeOrmCrudService } from "@nestjsx/crud-typeorm";
import { GeneralService } from "../general/general.service";
import { Inject } from "@nestjs/common";
import { JobItem } from "./entities/job-item.entity";

@Injectable()
export class JobItemService {
  constructor(
    @Inject("JobItem_Service") private readonly jobRepository: GeneralService<JobItem>
  ){
  }
}
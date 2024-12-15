import { Inject,Injectable } from "@nestjs/common";
import { GeneralService } from "../general/general.service";
import { Job } from "./entities/job.entity";

@Injectable()
export class JobService {
  constructor(
    @Inject("Job_Service") private readonly jobRepository: GeneralService<Job>
  ){
  }
}
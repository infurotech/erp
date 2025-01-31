import { Injectable, Scope } from "@nestjs/common";
import { Job } from "./entities/job.entity";
import { CrudService } from "@shared/database";

@Injectable({ scope: Scope.REQUEST })
export class JobService extends CrudService<Job> {
  async initRepo(req: Request) {
    await this.initTenantRepository(req, Job);
  }
}

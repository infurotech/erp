import { Injectable, Scope } from "@nestjs/common";
import { Job } from "./entities/job.entity";
import { CrudService, DatabaseService} from '@packages/common';
 
@Injectable({ scope: Scope.REQUEST })
export class JobService extends CrudService<Job> {

  /**
   *
   */
  constructor(databaseService: DatabaseService) {
    super(databaseService,Job);
  } 
  
  async initRepo(req: Request) {
    await this.initTenantRepository(req, Job);
  }
}

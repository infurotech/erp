import { Injectable, Scope } from "@nestjs/common";
import { Job } from "./entities/job.entity";
import { CrudService, DatabaseService} from '@infuro/shared';
import { InjectRepository } from "@nestjs/typeorm";
import {Repository} from 'typeorm'
 
@Injectable({ scope: Scope.REQUEST })
export class JobService extends CrudService<Job> {

  constructor(@InjectRepository(Job) repo: Repository<Job>,databaseService: DatabaseService) {
    super(repo,databaseService);
  }
}

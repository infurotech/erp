import { Injectable, Scope } from "@nestjs/common";
import { Repository } from "../../../../shared/node_modules/typeorm"
import { Job } from "./entities/job.entity";
import { CrudService } from "@shared/crud/crud.service";
import { DatabaseService } from "@shared/database/database.service";

@Injectable({ scope: Scope.REQUEST })
export class JobService extends CrudService<Job> {
  private readonly databaseService: DatabaseService
  constructor(protected repo:Repository<Job>) {
    super(repo); // Will be assigned dynamically
  }

  async initRepo(req: Request) {
    const token = req.headers['authorization']?.split(' ')[1];
    const repo: Repository<Job> = await this.databaseService.getRepository<Job>(token, Job);
    this.repo = repo;
  }
}

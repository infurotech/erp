// import { Injectable, Scope } from "@nestjs/common";
// import { InjectRepository } from "@nestjs/typeorm";
// import { Repository } from 'typeorm';  // Correct way to import Repository

// import { Job } from "./entities/job.entity";
// import { CrudService } from "../../../../shared/src/crud/crud.service";
// import { DatabaseService } from "../../../../shared/src/database/database.service";

// @Injectable({ scope: Scope.REQUEST })
// export class JobService extends CrudService<Job> {
//   // constructor(@InjectRepository(Job) repo) {
//   //   super(repo);
//   // }

//   constructor(private readonly databaseService: DatabaseService) {
//     super(null); // Will be assigned dynamically
//   }

//   async initRepo(req: Request) {
//     const token = (req.headers.authorization as string)?.split(' ')[1];
//     const repo: Repository<Job> = await this.databaseService.getRepository<Job>(token, Job);
//     this.repo = repo;
//   }
// }
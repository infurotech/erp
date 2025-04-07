import { Injectable, Scope } from "@nestjs/common";

import { CrudService, DatabaseService } from "@infuro/shared";
import { InjectRepository } from "@nestjs/typeorm";
import { Tenant } from "../entities/tenant.entity";

@Injectable({ scope: Scope.REQUEST })
export class TenantService extends CrudService<Tenant> {

  constructor(@InjectRepository(Tenant) repo,databaseService: DatabaseService) {
    super(repo,databaseService,Tenant);
  }
} 
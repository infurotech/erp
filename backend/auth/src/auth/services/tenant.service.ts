import { Injectable, Scope } from "@nestjs/common";

import { CrudService, InjectTenantRepository } from "@infuro/shared";
import { Tenant } from "../entities/tenant.entity";

@Injectable({ scope: Scope.REQUEST })
export class TenantService extends CrudService<Tenant> {

  constructor(@InjectTenantRepository(Tenant) repo) {
    super(repo);
  }
}
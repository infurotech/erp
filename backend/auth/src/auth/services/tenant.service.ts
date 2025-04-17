import { Inject, Injectable, Scope } from "@nestjs/common";

import { CrudService,CONNECTION ,DataSource, Repository,Tenant } from '@infuro/shared'; // Path to your CrudService

@Injectable({ scope: Scope.REQUEST })
export class TenantService extends CrudService<Tenant> {

  constructor( 
    @Inject(CONNECTION) connection: DataSource,
  ) { 
    super(connection.getRepository(Tenant));
  } 
}
import { Injectable, Scope } from "@nestjs/common";

import { CrudService, DatabaseService } from "@infuro/shared";
import { InjectRepository } from "@nestjs/typeorm";
import { Property } from "../entities/properties.entity";

@Injectable({ scope: Scope.REQUEST })
export class PropertyService extends CrudService<Property> {

  constructor(@InjectRepository(Property) repo,databaseService: DatabaseService) {
    super(repo,databaseService);
  }
}
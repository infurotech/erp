import { Injectable, Scope } from "@nestjs/common";

import { CrudService, DatabaseService } from "@infuro/shared";
import { InjectRepository } from "@nestjs/typeorm";
import { Property } from "../entities/properties.entity";

@Injectable({ scope: Scope.REQUEST })
export class PropertyService extends CrudService<Property> {

  constructor(@InjectRepository(Property) repo,databaseService: DatabaseService) {
    super(repo,databaseService);
  }

  async findNearbyHostels(lat: number, lng: number, radius: number = 5000): Promise<Property[]> {
    return this.repo.query(
    `SELECT id, name, address, price_per_month, available_units,             ST_DistanceSphere(location, ST_MakePoint($1, $2)) AS distance      FROM hostels      WHERE available_units > 0      AND ST_DistanceSphere(location, ST_MakePoint($1, $2)) <= $3      ORDER BY distance;`,
        [lng, lat, radius]
      );
    }
}
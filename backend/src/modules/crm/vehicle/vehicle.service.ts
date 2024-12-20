import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { TypeOrmCrudService } from "@nestjsx/crud-typeorm";

import { Vehicle } from "./entities/vehicle.entity";

@Injectable()
export class VehicleService extends TypeOrmCrudService<Vehicle> {
  constructor(@InjectRepository(Vehicle) repo) {
    super(repo);
  }
}
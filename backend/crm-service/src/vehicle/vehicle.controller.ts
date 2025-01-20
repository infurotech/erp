import { Controller } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";

import { Vehicle } from "./entities/vehicle.entity";
import { MessagePattern, Payload } from '@nestjs/microservices';
@Controller()
export class VehicleController {
  constructor(@InjectRepository(Vehicle) repo) {
  }

  @MessagePattern('getVehicles')
   getVehicles() {
     return {};
  }
}
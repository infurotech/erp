import { Controller, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";

import { Vehicle } from "./entities/vehicle.entity";
import { GrpcMethod } from '@nestjs/microservices';
@Controller()
export class VehicleController {
  constructor(@InjectRepository(Vehicle) repo) {
  }

  @GrpcMethod('VehicleService','getVehicles')
   getVehicles() {
     return {};
  }
}
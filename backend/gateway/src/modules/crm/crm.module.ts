import { Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";

import { CustomerService } from './customer/customer.service';
import { CustomerController } from './customer/customer.controller';
import { Customer } from './customer/entities/customer.entity';

import { VehicleService } from './vehicle/vehicle.service';
import { VehicleController } from './vehicle/vehicle.controller';
import { Vehicle } from './vehicle/entities/vehicle.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Customer, Vehicle])],
  providers: [CustomerService, VehicleService],
  exports: [CustomerService, VehicleService],
  controllers: [CustomerController, VehicleController],
})
export class CrmModule {}

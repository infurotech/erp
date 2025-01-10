import { Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";
import { VehicleService } from './vehicle/vehicle.service';
import { Vehicle } from './vehicle/entities/vehicle.entity';
import { CustomerController } from './customer/customer.controller';
import { VehicleController } from './vehicle/vehicle.controller';
import { CustomerService } from './customer/customer.service';
import { Customer } from './customer/entities/customer.entity';


@Module({
  imports: [TypeOrmModule.forFeature([Customer, Vehicle])],
  controllers: [CustomerController, VehicleController],
  providers: [CustomerService, VehicleService],
})
export class CrmModule {}

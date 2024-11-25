import { Module } from '@nestjs/common';
import { VehicleService } from './vehicle.service';
import { VehicleController } from './vehicle.controller';
import { Vehicle } from './entities/vehicle.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Vehicle])],
  exports: [VehicleService],
  controllers: [VehicleController],
  providers: [VehicleService],
})
export class VehicleModule {}

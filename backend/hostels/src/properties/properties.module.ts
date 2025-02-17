import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { Repository , DataSource } from 'typeorm';
import { AuditService, DatabaseService } from '@infuro/shared';
import { Property } from './entities/properties.entity';
import { PropertyService } from './services/properties.service';
import { PropertyController, SearchController } from './controllers/properties.controller';
import { BookingService } from './services/bookings.service';
import { BookingController } from './controllers/bookings.controller';
import { Booking } from './entities/bookings.entity';
@Module({
  imports: [TypeOrmModule.forFeature([Property, Booking])],
  providers: [JwtService, PropertyService, BookingService, Repository,
    {
    provide: DatabaseService,
    useFactory: (dataSource: DataSource) => new DatabaseService(dataSource),
    inject: [DataSource],
  },
  AuditService],
  exports: [PropertyService, DatabaseService, BookingService],
  controllers: [PropertyController, BookingController, SearchController],
})
export class PropertyDataModule {}

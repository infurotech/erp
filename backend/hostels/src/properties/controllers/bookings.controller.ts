import { Controller, UseGuards } from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';
import { Property } from '../entities/properties.entity';
import { PropertyService } from '../services/properties.service';
import { Booking } from '../entities/bookings.entity';
import { BookingService } from '../services/bookings.service';
import { AuthGuard } from '@infuro/shared';
 
@Crud({
  model: {
    type: Property
  }
})
@Controller('booking')
@UseGuards(AuthGuard)
export class BookingController implements CrudController<Booking> {
  constructor(public service: BookingService) {}
 
}
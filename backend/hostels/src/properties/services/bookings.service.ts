import { Injectable, Scope } from "@nestjs/common";

import { CrudService, DatabaseService } from "@infuro/shared";
import { InjectRepository } from "@nestjs/typeorm";
import { Booking } from "../entities/bookings.entity";

@Injectable({ scope: Scope.REQUEST })
export class BookingService extends CrudService<Booking> {

  constructor(@InjectRepository(Booking) repo,databaseService: DatabaseService) {
    super(repo,databaseService);
  }
}
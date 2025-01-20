import { Controller, Get, Inject } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";

@Controller("vehicles")
export class VehicleController {

  constructor(@Inject('CRUD_PACKAGE') private readonly client: ClientProxy) {}

  @Get()
  getVehicles() {
    return this.client.send('getVehicles', {data: null});
  }

}
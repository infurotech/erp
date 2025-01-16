import { Controller, Get, Inject, OnModuleInit } from "@nestjs/common";
import { ClientGrpc } from "@nestjs/microservices";
import { Observable } from "rxjs";

interface VehicleService {
    getVehicles(data : {}): Observable<any>;
}

@Controller("vehicles")
export class VehicleController implements OnModuleInit {
  private vehicleService: VehicleService;

  constructor(@Inject('CRUD_PACKAGE') private readonly client: ClientGrpc) {}
  
  onModuleInit() {
    this.vehicleService = this.client.getService<VehicleService>('VehicleService');
  }

  @Get()
  getVehicles() {
    return this.vehicleService.getVehicles(null);
  }

}
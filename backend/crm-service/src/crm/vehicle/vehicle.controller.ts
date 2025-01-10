import { Controller } from "@nestjs/common";
import { Crud, CrudController } from "@nestjsx/crud";
import { Vehicle } from "./entities/vehicle.entity";
import { VehicleService } from "./vehicle.service";


@Crud({
  model: {
    type: Vehicle,
  },
})
@Controller("vehicles")
export class VehicleController implements CrudController<Vehicle> {
  constructor(public service: VehicleService) {}
}
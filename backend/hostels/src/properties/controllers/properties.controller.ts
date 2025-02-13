import { Controller } from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';
import { Property } from '../entities/properties.entity';
import { PropertyService } from '../services/properties.service';
 
@Crud({
  model: {
    type: Property
  }
})
@Controller('properties')
export class PropertyController implements CrudController<Property> {
  constructor(public service: PropertyService) {}
 
}
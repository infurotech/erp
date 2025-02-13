import { Controller, Get, Query } from '@nestjs/common';
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

  @Get("search")
  async findNearbyHostels(
    @Query("search") search?: string,
    @Query("minPrice") minPrice?: number,
    @Query("maxPrice") maxPrice?: number,
    @Query("lat") lat?: number,
    @Query("lng") lng?: number,
    @Query("radius") radius?: number,
    @Query("page") page?: number,
    @Query("skip") skip?: number
  ) {
    return this.service.findNearbyHostels(search, minPrice, maxPrice, lat, lng, radius, page, skip);
  }
}
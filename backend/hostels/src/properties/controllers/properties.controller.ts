import { Controller, Get, Param, ParseIntPipe, Query, Req, UseGuards } from '@nestjs/common';
import { Crud, CrudController, Override } from '@nestjsx/crud';
import { Property } from '../entities/properties.entity';
import { PropertyService } from '../services/properties.service';
import { AuthGuard } from '@infuro/shared';
 
@Crud({
  model: {
    type: Property
  }
})
@Controller('properties')
@UseGuards(AuthGuard)
export class PropertyController implements CrudController<Property> {
  constructor(public service: PropertyService) {}

  @Override("getOneBase")
  async getOneCustom(@Param("id", ParseIntPipe) id: number): Promise<Property & { availableUnits: number }> {
    return this.service.findOneCustom(id);
  }

  @Override("getManyBase")
  async getManyCustom(@Req() req: Request): Promise<Array<Property>> {
    return this.service.findAllCustom();
  }
}

@Controller('search')
export class SearchController implements CrudController<Property> {
  constructor(public service: PropertyService) {}

  @Get("")
  async findNearbyHostels(
    @Query("search") search?: string,
    @Query("minPrice") minPrice?: string,
    @Query("maxPrice") maxPrice?: string,
    @Query("lat") lat?: number,
    @Query("lng") lng?: number,
    @Query("radius") radius?: string,
    @Query("page") page?: number,
    @Query("skip") skip?: number
  ) {
    return this.service.findNearbyHostels(
      search, 
      parseFloat(minPrice || '0'), 
      parseFloat(maxPrice || '0'), 
      lat, 
      lng, 
      parseFloat(radius || '0'), 
      page, 
      skip);
  }
}
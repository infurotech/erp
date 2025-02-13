import { Injectable, Scope } from "@nestjs/common";

import { CrudService, DatabaseService } from "@infuro/shared";
import { InjectRepository } from "@nestjs/typeorm";
import { Property } from "../entities/properties.entity";

@Injectable({ scope: Scope.REQUEST })
export class PropertyService extends CrudService<Property> {

  constructor(@InjectRepository(Property) repo, databaseService: DatabaseService) {
    super(repo, databaseService);
  }

  async findNearbyHostels(
    search?: string,
    minPrice: number = 0,
    maxPrice: number = 100000,
    lat: number = 43.0511,
    lng: number = 76.1436,
    radius: number = 5000,
    page: number = 10,
    skip: number = 0
  ): Promise<Property[]> {
    return this.repo.query(
      `SELECT id, name, address, pricepermonth, availableunits, latitude, longitude, 
              hosteltype, roomtype, amenities, otherofferings, imageurls
       FROM property
       WHERE 
          (ST_DistanceSphere(ST_SetSRID(ST_MakePoint(longitude::FLOAT, latitude::FLOAT), 4326), 
           ST_MakePoint($4::FLOAT, $5::FLOAT)) < $6)
          
          OR ($2::DOUBLE PRECISION IS NULL OR pricepermonth >= $2::DOUBLE PRECISION)  -- Minimum price
          OR ($3::DOUBLE PRECISION IS NULL OR pricepermonth <= $3::DOUBLE PRECISION)  -- Maximum price
          
          OR ($1::TEXT IS NULL OR name ILIKE '%' || $1::TEXT || '%') 
          OR ($1::TEXT IS NULL OR address ILIKE '%' || $1::TEXT || '%')
       
       ORDER BY pricePerMonth ASC
       LIMIT $7 OFFSET $8;`,
      [search, minPrice, maxPrice, lng, lat, radius, page, skip]
    );
  }
}

// SELECT * FROM hostels
// WHERE 
//   ($1 IS NULL OR name ILIKE '%' || $1 || '%')  -- Search by name (case-insensitive)
//   OR ($2 IS NULL OR price_per_month >= $2)    -- Minimum price
//   OR ($3 IS NULL OR price_per_month <= $3)    -- Maximum price
//   OR ($4 IS NULL OR ST_DWithin(location, ST_MakePoint($5, $4)::geography, $6)); -- Geolocation filter
// ST_DistanceSphere(ST_SetSRID(ST_MakePoint(longitude, latitude), 4326), ST_MakePoint(-73.985, 40.758)) AS distance
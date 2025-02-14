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
    minPrice?: number,
    maxPrice?: number,
    lat: number = 40.758,
    lng: number = -73.9855,
    radius: number = 5000,
    page: number = 100,
    skip: number = 0
  ): Promise<Property[]> {

    console.log([search || null, minPrice || null, maxPrice || null, lng || null, lat || null, radius || null, page || null, skip || null]);

    return this.repo.query(
      `SELECT property.id, property.name, address, pricepermonth, (availableunits - count(booking)) as availableunits, latitude, longitude, 
              hosteltype, roomtype, amenities, otherofferings, imageurls
       FROM property
       LEFT JOIN booking on property.id = booking.propertyid
       WHERE 
          (ST_DistanceSphere(ST_SetSRID(ST_MakePoint(longitude::FLOAT, latitude::FLOAT), 4326), 
           ST_MakePoint($4::FLOAT, $5::FLOAT)) < $6) AND (
          
           ($2::DOUBLE PRECISION IS NULL OR pricepermonth >= $2::DOUBLE PRECISION)  -- Minimum price
          AND ($3::DOUBLE PRECISION IS NULL OR pricepermonth <= $3::DOUBLE PRECISION)  -- Maximum price
          
          AND ($1::TEXT IS NULL OR (property.name ILIKE '%' || $1::TEXT || '%' OR address ILIKE '%' || $1::TEXT || '%')))
       
       GROUP BY property.id
       ORDER BY pricePerMonth ASC
       LIMIT $7 OFFSET $8;`,
      [search || null, minPrice || null, maxPrice || null, lng || null, lat || null, radius || 5000, page || null, skip || null]
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
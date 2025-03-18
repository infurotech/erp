import { Injectable, NotFoundException, Scope } from "@nestjs/common";

import { CrudService, DatabaseService } from "@infuro/shared";
import { InjectRepository } from "@nestjs/typeorm";
import { Property } from "../entities/properties.entity";
import { FindOneOptions, Repository } from "typeorm";
import { Booking } from "../entities/bookings.entity";

@Injectable({ scope: Scope.REQUEST })
export class PropertyService extends CrudService<Property> {

  constructor(
    @InjectRepository(Property) repo,
    @InjectRepository(Booking) private readonly bookingRepo,
    databaseService: DatabaseService) {
    super(repo, databaseService);
  }

  async findOneCustom(id: number): Promise<Property & { availableUnits: number }> {
    // Fetch the property
    const property = await this.repo.createQueryBuilder("property")
      .where("property.id = :id", { id })
      .getOne();

    if (!property) {
      throw new NotFoundException(`Property with ID ${id} not found`);
    }

    // Count booked units for this property
    const bookedUnits = await this.bookingRepo
      .createQueryBuilder("booking")
      .where("booking.propertyId = :id", { id })
      .andWhere("booking.booked = :status", { status: "true" })
      .getCount();

    // Calculate available units dynamically
    const availableUnits = Math.max(property.availableunits - bookedUnits, 0);

    return { ...property, availableUnits };
  }

  async findAllCustom(): Promise<Array<Property>> {
    const properties = await this.repo
      .createQueryBuilder("property")
      .leftJoinAndSelect(
        (qb) =>
          qb
            .from(Booking, "booking")
            .select("booking.propertyid", "propertyid")
            .addSelect("COUNT(booking.id)", "bookedunits")
            .where("booking.booked = :status", { status: "true" })
            .groupBy("booking.propertyid"),
        "bookings",
        "bookings.propertyid = property.id"
      )
      .addSelect("COALESCE(property.availableunits - bookings.bookedunits, property.availableunits)", "availableunits")
      .getRawMany();

      return properties.map((row) => ({
        id: row.property_id,
        name: row.property_name,
        address: row.property_address,
        availableunits: row.availableunits, // Calculated field
        amenities: row.property_amenities,
        latitude: row.property_latitude,
        longitude: row.property_longitude,
        otherofferings: row.property_otherofferings,
        pricepermonth: row.property_pricepermonth
      })) as (Property)[];
  }

  async findNearbyHostels(
    search?: string,
    minPrice?: number,
    maxPrice?: number,
    lat: number = 38.9520687,
    lng: number = -77.8688851,
    radius: number = 5,
    page: number = 100,
    skip: number = 0
  ): Promise<Property[]> {

    const data = this.repo.query(
      `SELECT property.id, property.name, address, pricepermonth, (availableunits - count(booking)) as availableunits, latitude, longitude, 
              amenities, otherofferings,
              ST_DistanceSphere(
        ST_SetSRID(ST_MakePoint(longitude::FLOAT, latitude::FLOAT), 4326), 
        ST_MakePoint($4::FLOAT, $5::FLOAT)
    ) AS distance, COUNT(*) OVER() AS total
       FROM property
       LEFT JOIN booking on property.id = booking.propertyid and booking.booked <> false
       WHERE 
          (ST_DistanceSphere(ST_SetSRID(ST_MakePoint(longitude::FLOAT, latitude::FLOAT), 4326), 
           ST_MakePoint($4::FLOAT, $5::FLOAT)) < $6) 
           AND (
          
           ($2::DOUBLE PRECISION IS NULL OR pricepermonth >= $2::DOUBLE PRECISION)  -- Minimum price
          AND ($3::DOUBLE PRECISION IS NULL OR pricepermonth is null)  -- Maximum price
          
          AND ($1::TEXT IS NULL OR (property.name ILIKE '%' || $1::TEXT || '%' OR address ILIKE '%' || $1::TEXT || '%')))
       
       GROUP BY property.id
       HAVING (availableunits - count(booking))  > 0 
       ORDER BY distance ASC
       LIMIT $7 OFFSET $8;`,
      [search || null, minPrice || null, maxPrice || null, lng || null, lat || null, radius * 1000 || 5000, page || null, skip || null]
    );
    return data;
  }
}

// SELECT * FROM hostels
// WHERE 
//   ($1 IS NULL OR name ILIKE '%' || $1 || '%')  -- Search by name (case-insensitive)
//   OR ($2 IS NULL OR price_per_month >= $2)    -- Minimum price
//   OR ($3 IS NULL OR price_per_month <= $3)    -- Maximum price
//   OR ($4 IS NULL OR ST_DWithin(location, ST_MakePoint($5, $4)::geography, $6)); -- Geolocation filter
// ST_DistanceSphere(ST_SetSRID(ST_MakePoint(longitude, latitude), 4326), ST_MakePoint(-73.985, 40.758)) AS distance

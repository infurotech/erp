import {
  BadRequestException,
  Injectable,
  NestMiddleware,
  NotFoundException,
} from "@nestjs/common";
import { Request, Response, NextFunction } from "express";
import { DatabaseService } from "../database/database.service";
import { CachingManager } from "../caching";
import { RequestContext } from "../contexts";

@Injectable()
export class TenantMiddleware implements NestMiddleware {
  constructor(private readonly databaseService: DatabaseService) {}

  async use(_req: Request, _res: Response, next: NextFunction) {
    const tenantId = RequestContext.get("tenantId");
    const dbOptions = RequestContext.get("dbOptions");

    if (!tenantId) {
      return next(); // If no tenantId, proceed with default behavior
    }

    // Check if database exists for tenant
    const dbExists = await this.databaseService.doesDatabaseExist(dbOptions.db_database);

    if (!dbExists) {
      // Create new DB if not exists
      // await this.databaseService.createTenantDatabase(dbOptions);

      throw new BadRequestException("Tenant Database Does not Exists");
    }

    // Bind tenant database connection
    await this.databaseService.bindTenantDatabase(tenantId, dbOptions);

    next();
  }
}

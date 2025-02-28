import { Inject, Injectable } from "@nestjs/common";
import { TypeOrmCrudService } from "@nestjsx/crud-typeorm";
import { Repository } from "typeorm";
import { DatabaseService } from "../database/database.service";
import { InjectRepository } from "@nestjs/typeorm";
import { CachingManager } from "../caching";
import { Cache } from "@nestjs/cache-manager";
import { RequestContext } from "../contexts";

@Injectable()
export class CrudService<T> extends TypeOrmCrudService<T> {
  constructor(
    private readonly databaseService: DatabaseService,
    @InjectRepository(Object) private readonly baseRepo: Repository<T>,
  ) {
    super(baseRepo);
    this.overrideRepository();
  }

  private async overrideRepository() {
    const tenantId = RequestContext.get("tenantId");
    if (!tenantId) return;

    const connection = await this.databaseService.getTenantConnection(tenantId);
    this.repo = connection.getRepository(this.baseRepo.target as any);
  }

  /**
   * Find all entities with pagination support
   * @param skip Number of records to skip
   * @param take Number of records to take
   * @returns Paginated result
   */
  async findAllWithPagination(skip: number, take: number) {
    return this.repo.find({
      skip,
      take,
    });
  }

  /**
   * Soft delete an entity
   * @param id The ID of the entity to soft delete
   * @returns Result of the deletion
   */
  async softDelete(id: number | string) {
    return this.repo.softDelete(id);
  }

  /**
   * Restore a soft-deleted entity
   * @param id The ID of the entity to restore
   * @returns Result of the restoration
   */
  async restore(id: number | string) {
    return this.repo.restore(id);
  }
}

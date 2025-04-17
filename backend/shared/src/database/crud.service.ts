import { Injectable, OnModuleInit } from '@nestjs/common';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { DatabaseService } from './database.service';
import { EntityTarget, ObjectLiteral, Repository} from 'typeorm';

@Injectable()
export class CrudService<T> extends TypeOrmCrudService<T> implements OnModuleInit   {
  constructor(
    repo : Repository<T>,
    private readonly databaseService: DatabaseService,
    private readonly entity: EntityTarget<T>) {
      console.log('Constructor is called');
      super(repo);
      this.onModuleInit();
  }
 
  async onModuleInit() {
    try {
      console.log('onModuleInit called');
      this.repo = await this.databaseService.getRepository<T>("", this.entity);
      (this as any).repository = this.repo;
    } catch (error) {
      console.error('Error in onModuleInit:', error);
    }
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

  // Example function to get repository dynamically from database service
  async getRepositoryForTenant(tenantId: string, entity: EntityTarget<T>): Promise<Repository<T>> {
    // Call the getRepository method of DatabaseService
    return await this.databaseService.getRepository(tenantId, entity);
  }

}

import { Injectable } from '@nestjs/common';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class CrudService<T> extends TypeOrmCrudService<T> {
  constructor(protected readonly repo: Repository<T>) {
    super(repo); // Call the parent constructor
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

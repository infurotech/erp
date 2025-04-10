import { Injectable, Inject, Scope } from '@nestjs/common';
import { EntityTarget, ObjectLiteral, Repository, DataSource } from 'typeorm';
import { CONNECTION } from '../tenancy/tenancy.module'; // Token that provides tenant DataSource

@Injectable({ scope: Scope.REQUEST })
export class CrudService<T extends ObjectLiteral> {
  constructor(
    @Inject(CONNECTION) private readonly connection: DataSource
  ) {}

  private getRepository(entity: EntityTarget<T>): Repository<T> {
    return this.connection.getRepository(entity);
  }

  async findAllWithPagination(entity: EntityTarget<T>, skip = 0, take = 10) {
    return this.getRepository(entity).find({ skip, take });
  }

  async findOneByField<K extends keyof T>(entity: EntityTarget<T>, field: K, value: T[K]) {
    return this.getRepository(entity).findOneBy({ [field]: value } as any);
  }

  async create(entity: EntityTarget<T>, data: Partial<T>) {
    return this.getRepository(entity).save(data);
  }

  async softDelete(entity: EntityTarget<T>, id: number | string) {
    return this.getRepository(entity).softDelete(id);
  }

  async restore(entity: EntityTarget<T>, id: number | string) {
    return this.getRepository(entity).restore(id);
  }
}

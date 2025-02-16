import { Injectable, Scope } from '@nestjs/common';
import { TenantTypeOrmProvider } from './tenant.typeorm';
import { Request } from 'express';

@Injectable({ scope: Scope.REQUEST })
export class TenantService {
  constructor(
    private readonly typeOrmTenantProvider: TenantTypeOrmProvider,
    private readonly request: Request,
  ) {}

  async getTenantSpecificData() {
    const tenantId = this.request['tenantId'];
    if (!tenantId) {
      throw new Error('Tenant ID not found in the request');
    }

    const dataSource = await this.typeOrmTenantProvider.getDataSource(tenantId);
    const repository = dataSource.getRepository('YourEntity'); // Replace with your entity

    return repository.find();
  }
}

import { EntityRepository, Repository } from 'typeorm';
import { Tenant } from './tenant.entity';

@EntityRepository(Tenant)
export class TenantRepository extends Repository<Tenant> {

  // Function to fetch tenant by tenantId
  async findTenantById(tenantId: string): Promise<Tenant | null> {
    return await this.findOne({ where: { id: tenantId } });
  }

}

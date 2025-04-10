import { Module, DynamicModule } from '@nestjs/common';
import { TenantContextService } from './tenant.context'; 
import { TenantConnectionManager } from './tenant-connection.manager'; 
import { TenantRepositoryProvider } from './tenant-repository.provider'; 
import { EntityTarget } from 'typeorm';
import { TenantRepository } from './tenant.repository';

@Module({
  providers: [
    TenantContextService, 
    TenantConnectionManager,  // Make sure these are provided here as well
    TenantRepository
  ],
  exports: [
    TenantContextService, 
    TenantConnectionManager,  // Also exported so they can be used in other modules
  ],
})
export class TenantOrmModule {
  static forFeature(entities: EntityTarget<any>[]): DynamicModule {
    const providers = entities.map(entity => TenantRepositoryProvider(entity));  // Dynamically create providers for each entity
  
    return {
      module: TenantOrmModule,
      providers: [
        TenantContextService, 
        TenantConnectionManager,
        ...providers,  // Dynamically add repository providers
      ],
      exports: [
        TenantContextService, 
        TenantConnectionManager,
        ...providers,  // Export repository providers dynamically
      ],
    };
  }
}

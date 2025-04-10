import { EntityTarget, Repository } from "typeorm";
import { TenantConnectionManager } from "./tenant-connection.manager";
import { TenantContextService } from "./tenant.context";
import { Provider, Scope } from "@nestjs/common";

export function TenantRepositoryProvider<T>(entity: EntityTarget<T>): Provider {
    const token = `TENANT_REPOSITORY_${(entity as any).name}`;
  
    return {
      provide: token,
      scope: Scope.REQUEST,
      inject: [TenantContextService, TenantConnectionManager],
      useFactory: async (
        tenantContext: TenantContextService,
        connManager: TenantConnectionManager
      ): Promise<Repository<T>> => {
        const tenantId = tenantContext.getTenantId();
        const connection = await connManager.getConnection(tenantId); // connection should be initialized already
        return  connection.getRepository<T>(entity);
      },
    };
  }
  
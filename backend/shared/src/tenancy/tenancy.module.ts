import { Global, Module, Scope } from "@nestjs/common";

import { REQUEST } from "@nestjs/core";
import { Request } from "express";
export const CONNECTION = Symbol('CONNECTION');
import { getTenantConnection } from "./tenancy.utils";
import { CachingManager } from '../caching/caching.manager'; // adjust path if needed
import { CachingModule } from '../caching/caching.module'; // ✅ Import this

/**
 * Note that because of Scope Hierarchy, all injectors of this
 * provider will be request-scoped by default. Hence there is
 * no need for example to specify that a consuming tenant-level
 * service is itself request-scoped.
 * https://docs.nestjs.com/fundamentals/injection-scopes#scope-hierarchy
 */
const connectionFactory = {
  provide: CONNECTION,
  scope: Scope.REQUEST,
  useFactory: async (request: Request,cachingManager: CachingManager) => {
    const { tenantId } = request as Request & { tenantId?: string };
    
    if (tenantId) {
      const connection = await getTenantConnection(tenantId,cachingManager);
      
      const queryRunner =  connection.createQueryRunner();
      await queryRunner.connect();

      return queryRunner.manager;
    }

    return null;
  },
  inject: [REQUEST, CachingManager], // 🧠 FIX HERE
};

@Global()
@Module({
  imports: [CachingModule], // ✅ This line is important
  providers: [connectionFactory],
  exports: [CONNECTION],
})
export class TenancyModule {}
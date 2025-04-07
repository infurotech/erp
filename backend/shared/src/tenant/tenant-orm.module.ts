import { DynamicModule } from "@nestjs/common";
import { EntityTarget } from "typeorm";
import { TenantRepositoryProvider } from "./tenant-repository.provider";

export class TenantOrmModule {
    static forFeature(entities: EntityTarget<any>[]): DynamicModule {
      const providers = entities.map(entity => TenantRepositoryProvider(entity));
  
      return {
        module: TenantOrmModule,
        providers: providers,
        exports: providers,
      };
    }
  }
  
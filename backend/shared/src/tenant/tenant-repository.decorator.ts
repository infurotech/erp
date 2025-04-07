import { Inject } from "@nestjs/common";
import { EntityTarget } from "typeorm";


export function InjectTenantRepository(entity: EntityTarget<any>): ParameterDecorator {
    const token = `TENANT_REPOSITORY_${(entity as any).name}`;
  
    return (target, key, index) => {
      Reflect.defineMetadata('tenant:entity', entity, target, `__repo__${index}`);
      Inject(token)(target, key, index);
    };
  }
  
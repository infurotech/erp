import { Inject, Injectable, Scope } from "@nestjs/common";
import { REQUEST } from "@nestjs/core";
import { Request } from 'express';  

@Injectable({ scope: Scope.REQUEST })
export class TenantContextService {
  constructor(@Inject(REQUEST) private readonly req: Request) {}

  getTenantId(): string {
    return this.req.headers['x-tenant-id'] as string;
  }
}
 
import { Module } from "@nestjs/common";
import { TenantMiddleware } from "./tenant.middleware";
import { TenantExtMiddleware } from "./tenant-ext.middleware";
import { CachingModule } from "../caching";

@Module({ imports:[CachingModule],providers: [TenantMiddleware,TenantExtMiddleware] })
export class TenantModule {}

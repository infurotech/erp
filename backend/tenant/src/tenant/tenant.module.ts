import { Module, Scope } from "@nestjs/common";
import { TenantService } from "./tenant.service";

@Module({
  providers: [
    TenantService,
    {
      provide: "TENANT_CONNECTION",
      scope: Scope.REQUEST,
      useFactory: async (tenantService: TenantService, request: any) => {
        const tenantName = request["user"]?.["name"];
        return await tenantService.connectTenant(tenantName);
      },
      inject: [TenantService, "REQUEST"],
    },
  ],
  exports: ["TENANT_CONNECTION", TenantService],
})
export class TenantModule {}

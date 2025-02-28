import { Injectable, NestMiddleware } from "@nestjs/common";
import { Request, Response } from "express";
import { JwtPayloadDto } from "../auth/jwt-payload.dto";
import { CachingManager } from "../caching";
import { RequestContext } from "./request.context";

@Injectable()
export class RequestContextMiddleware implements NestMiddleware {
  constructor() {}
  async use(req: Request, res: any, next: (error?: any) => void) {
    const user = req["user"] as JwtPayloadDto;
    RequestContext.set("userId", user.email || user.name || "unknown");
    RequestContext.set("userIp", req.ip);
    RequestContext.set("tenantId", user.tenantId);
    RequestContext.set("dbOptions", user.dbOptions);
    next();
  }
}

import { Injectable, NestMiddleware } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { JwtPayloadDto } from "./jwt-payload.dto";

@Injectable()
export class DecodeTokenMiddleware implements NestMiddleware {
  private jwtService = new JwtService();
  use(req: Request, _res: Response, next: (error?: any) => void) {
    const authorization = req.headers["authorization"];
    const tenantId = req.headers["x-tenant-id"];
    if (!authorization) {
      throw Error("Unauth Access");
    }
    const [authType, authToken] = authorization.split(" ");
    if (!["Bearer", "Basic"].includes(authType)) {
      throw Error("Invalid Auth Type");
    }
    const payload = this.jwtService.decode(authToken) as JwtPayloadDto;
    const { email, name } = payload;
    const userPayload: JwtPayloadDto = { email, name, tenantId };
    req["user"] = userPayload;
    next();
  }
}

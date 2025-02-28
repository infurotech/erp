import { Injectable, NestMiddleware } from "@nestjs/common";
import { Request, Response, NextFunction } from "express";
import { RequestContext } from "../contexts";
import { DataSource } from "typeorm";

@Injectable()
export class TenantExtMiddleware implements NestMiddleware {
  constructor(private dataSource: DataSource) {}
  async use(req: Request, _res: Response, next: NextFunction) {
    const [tenant] = await this.dataSource.query(
      `SELECT * FROM wp_wzaccounts WHERE label = ?`,
      [req["user"]["name"]]
    );
    // you can changes db options here (database, user, password)
    // dbConnection.database="tenant_abcd"
    
    req["user"]["dbOptions"] = tenant;
    next();
  }
}

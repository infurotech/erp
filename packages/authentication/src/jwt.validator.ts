import { JwtService } from "@nestjs/jwt";
import config from "./config";
import { Injectable } from "@nestjs/common";

export class JwtValidator {
  private jwtService: JwtService;
  constructor() {
    this.jwtService = new JwtService();
  }

  tokenValidator = {
    issuer:  config.tokenValidator.issuer,
    algorithms: config.tokenValidator.algorithms,
    audience:  config.tokenValidator.audience,
    securityKey: config.tokenValidator.securityKey,
  };
 
  authorizeToken(adminRoles:string[], serviceRoles?:string[]) {
    return async (req:any, res:any, next:any) => {
      try {
        let token = req.cookies && req.cookies["Abp.AuthToken"];
        let authType = "";

        if (!token) {
          const authorizationToken = req.headers.authorization || "";
          [authType, token] = authorizationToken.split(" ");
        }

        if (!token) {
          return this.responseHandler(req, res, this.unAuthorized());
        }

        const verifiedToken = this.verifyJwt(
          token,
          this.tokenValidator.securityKey
        );
        const CAMS = verifiedToken["CAM"];
        const roles =
          verifiedToken[
            "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"
          ];
        const camsRoles = Array.isArray(CAMS) ? CAMS : [CAMS];

        const access = adminRoles.some((serviceRole:any) =>
          camsRoles.some((role) => role.includes(serviceRole))
        );

        if (access === false) {
          const Roles = Array.isArray(roles) ? roles : [roles];

          const access = adminRoles.some((role:any) => Roles.includes(role));

          if (!access) {
            const err = {
              status: 401,
              message: "Permission not granted",
            };
            return this.responseHandler(req, res, err);
          }
        } else if (
          verifiedToken.email.length !== 0 &&
          verifiedToken.saccos_name.length !== 0
        ) {
          next();
        } else {
          const err = {
            status: 401,
            message: "Permission not granted",
          };
          return this.responseHandler(req, res, err);
        }
      } catch (error) {
        console.error("ValidatorError:", error);
        res.locals.status_code = 500;
        return this.responseHandler(req, res, error);
      }
    };
  }

  private verifyJwt(token: string, publicKey: string) {
    const claims = this.jwtService.verify(token, { 
      publicKey: publicKey,
      audience:  this.tokenValidator.audience,
      algorithms: ['HS256'] ,
      issuer:    this.tokenValidator.issuer
    });
    return claims;
  }

  private responseHandler(req:any, res:any, options:any) {
    let responseJson = {
      success: false,
      message: res.locals.message || "",
      data: res.locals.data || res.locals.error || {},
    };

    let status = res.locals.status_code || options?.status || 200;

    if (options && options.success) {
      responseJson = options;
    } else if (options && options.status != 200) {
      responseJson = typeof options === "function" ? options() : options;
      status = options.status && options.status ? options.status : 500;
    } else if (options) {
      responseJson.message = "Something went wrong. please try again.";
      status = 500;
    }
    if (res.locals.data) responseJson.success = true;
    return res.status(status).json(responseJson);
  }

  private unAuthorized() {
    return {
      status: 401,
      message: "UNAUTH_ACCESS",
    };
  }
}

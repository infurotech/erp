export class JwtPayloadDto {
  email: string;
  name: string;
  iat?: number;
  exp?: number;
  tenantId?: string;
  dbOptions?: {
    port: number;
    host: string;
    username: string;
    password: string;
    database: string;
  };
}

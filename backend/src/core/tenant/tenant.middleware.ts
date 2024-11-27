import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class TenantMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const authorizationHeader = req.headers['authorization'];

    if (!authorizationHeader) {
      throw new Error('Authorization token is missing');
    }

    // Decode tenant ID from token (replace with actual token decoding logic)
    const tenantId = this.decodeTenantFromToken(authorizationHeader);
    if (!tenantId) {
      throw new Error('Invalid token: Tenant ID not found');
    }

    // Attach tenantId to the request object
    req['tenantId'] = tenantId;

    next();
  }

  private decodeTenantFromToken(token: string): string | null {
    // Mocked token decoding logic (replace with JWT decoding or similar)
    const mockTokenMapping = {
      'Bearer token-for-tenant1': 'tenant1',
      'Bearer token-for-tenant2': 'tenant2',
    };

    return mockTokenMapping[token] || null;
  }
}

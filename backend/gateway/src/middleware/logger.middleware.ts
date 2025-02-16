import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { logger } from '@shared/logger';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class UnifiedLoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const startTime = Date.now();
    const { method, url, params, query, headers, body } = req;
    const ip = req.ip || req.headers['x-forwarded-for'] || req.connection.remoteAddress;

    let user: any = null;
    if (headers.authorization) {
      try {
        const token = headers.authorization.split(' ')[1];
        user = jwt.decode(token); // Decode JWT token
      } catch (error) {
        user = null;
      }
    }

    // Store log data in an object
    const logData: any = {
      message: 'API Request',
      method,
      url,
      params,
      query,
      body,
      ip,
      user,
      status: null,
      responseTime: null,
      responseData: null,
      error: null,
    };

    // Capture response data
    const oldJson = res.json;
    res.json = function (data) {
      logData.responseData = data;
      return oldJson.apply(res, arguments);
    };

    res.on('finish', () => {
      logData.status = res.statusCode;
      logData.responseTime = `${Date.now() - startTime}ms`;
      logger.info(logData);
    });

    res.on('error', (err) => {
      logData.error = err.message;
      logData.status = res.statusCode;
      logData.responseTime = `${Date.now() - startTime}ms`;
      logger.error(logData);
    });

    next();
  }
}

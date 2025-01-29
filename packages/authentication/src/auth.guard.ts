import { CanActivate, ExecutionContext } from '@nestjs/common';
import { JwtValidator } from './jwt.validator';


export class JwtAuthGuard implements CanActivate {
  private jwtValidator: JwtValidator;

  constructor(private adminRoles:string[]) {
    this.jwtValidator = new JwtValidator();
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();
    const res = context.switchToHttp().getResponse();
    const next = () => {};

    const authorizeMiddleware = this.jwtValidator.authorizeToken(this.adminRoles);
    try {
      await authorizeMiddleware(req, res, next);
      return true;
    } catch (err) {
      console.error('Authorization Error:', err);
      return false;
    }
  }
}
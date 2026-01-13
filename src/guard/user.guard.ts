import { Observable } from 'rxjs';
import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Global,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Global()
class UserGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    try {
      const request = context.switchToHttp().getRequest();
      const bearerToken = request.headers['authorization'];

      if (!bearerToken) {
        throw new UnauthorizedException('No token provided');
      }

      const token = bearerToken.split(' ')[1];

      let decodedToken = { id: '' };

      try {
        decodedToken = this.jwtService.verify(token);
      } catch (error) {
        throw new ForbiddenException(error);
      }

      request.user = decodedToken;

      return true;
    } catch (error) {
      throw new UnauthorizedException(error);
    }
  }
}

export default UserGuard;

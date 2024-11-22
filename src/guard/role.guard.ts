import {
  CanActivate,
  ExecutionContext,
  Injectable,
  ForbiddenException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from '../auth/constants';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private jwtService: JwtService, private reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);

    if (!token) {
      throw new UnauthorizedException('Token is missing or invalid');
    }

    try {
      // Verify JWT token
      const payload = await this.jwtService.verifyAsync(token, {
        secret: jwtConstants.secret,
      });

      // Attach user info to the request
      request['user'] = payload;

      // Extract user's role from payload
      const userRole = payload.role;

      // Get required roles from the decorator
      const requiredRoles = this.reflector.get<string[]>(
        'roles',
        context.getHandler(),
      ) || [];

      if (!requiredRoles.length) {
        return true; // If no roles are specified, allow access
      }

      // Check if user's role matches any of the required roles
      if (!requiredRoles.some((role) => role === userRole)) {
        throw new ForbiddenException(
          'You do not have permission to access this resource',
        );
      }

      return true; // Access granted
    } catch (error) {
      throw new UnauthorizedException('Invalid or expired token');
    }
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}

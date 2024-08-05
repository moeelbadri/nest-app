import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private reflector: Reflector) {}
  canActivate(context: ExecutionContext): boolean {
    const requiredRole = this.reflector.get<string>('role', context.getHandler());
    const request = context.switchToHttp().getRequest();
    console.log(request.Params.id)
    if (!request.session) throw new UnauthorizedException('You are not authorized to access this resource');
    if (request.session.user.role === 'admin') return true;
  }
}
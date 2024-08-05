import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { roles } from 'src/constants/enums';
import { UserService } from 'src/user/user.service';

@Injectable()
export class MongoIDGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
     const request = context.switchToHttp().getRequest();
     const checkForValidMongoDbID = /^[0-9a-fA-F]{24}$/;
     if(request.params.id && !checkForValidMongoDbID.test(request.params.id)) throw new UnauthorizedException('Invalid MongoDB ID format');
     return true
  }
}
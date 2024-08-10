import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector,ModuleRef } from '@nestjs/core';
import { roles } from 'src/constants/enums';
import { BookService } from 'src/book/book.service';
import { ReviewService } from 'src/review/review.service';
import { UserService } from 'src/user/user.service';
import { ReservationService } from 'src/reservation/reservation.service';
@Injectable()
export class AuthGuard implements CanActivate {
  private services:any;
    constructor(private reflector: Reflector,
    private moduleRef: ModuleRef,
  ) {
    this.services= {
      userService: UserService,
      bookService: BookService,
      reviewService: ReviewService,
      reservationService :ReservationService
    };
  }
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    if (request.session.user._id) {request.body.userId = request.session.user._id}

    if (!request.session) throw new UnauthorizedException('You are not authorized to access this resource');
    
    if (request.params.id===request.session.user._id) return true; // access his profile

    const providedService = this.reflector.get<string>('service', context.getHandler());

     if(providedService){
      const service = this.moduleRef.get(this.services[providedService], { strict: false });
      if(service){
        const document = await service.findOne(request.params.id);
        if(document.userId !== request.session.user._id) throw new UnauthorizedException('You cant access this protected resource');
      }
     }else{
      const requiredRole = this.reflector.get<string>('role', context.getHandler());
      const keys = Object.values(roles);  
      const requiredRoleIndex = keys.indexOf(requiredRole);
      const userRoleIndex = keys.indexOf(request.session.user.role);
      if (userRoleIndex < requiredRoleIndex) throw new UnauthorizedException('You are not authorized to make this request');
     }
  }
}
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';
import { APP_GUARD } from '@nestjs/core';
import { BookModule } from './book/book.module';
import { ReviewModule } from './review/review.module';
import { ReservationModule } from './reservation/reservation.module';
@Module({
  imports: [ 
    MongooseModule.forRoot('mongodb://localhost:27017'),
    ThrottlerModule.forRoot([{
    ttl: 60000,
    limit: 100,
  }]), 
  UserModule, BookModule, ReviewModule, ReservationModule],
  controllers: [AppController],
  providers: [AppService,
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    }
  ],
})
export class AppModule {}

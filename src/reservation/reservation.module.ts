import { Module } from '@nestjs/common';
import { ReservationService } from './reservation.service';
import { ReservationController } from './reservation.controller';
import { Reservation, ReservationSchema } from './entities/reservation.entity';
import { MongooseModule } from '@nestjs/mongoose';
import { Book, BookSchema } from 'src/book/entities/book.entity';
import { User, UserSchema } from 'src/user/entities/user.entity';

@Module({
  imports: [
 MongooseModule.forFeature([{ name: Reservation.name, schema: ReservationSchema }]),
 MongooseModule.forFeature([{ name: Book.name, schema: BookSchema }]),
 MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
],
  controllers: [ReservationController],
  providers: [ReservationService],
})
export class ReservationModule {}

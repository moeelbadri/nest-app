import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Connection, Model } from 'mongoose';
import { Book } from 'src/book/entities/book.entity';
import { User } from 'src/user/entities/user.entity';
import { Reservation } from './entities/reservation.entity';
@Injectable()
export class ReservationService {
  constructor(
    @InjectModel(Reservation.name) private reservationModel: Model<Reservation>,
    @InjectModel(Book.name) private bookModel: Model<Book>,
    @InjectModel(User.name) private userModel: Model<User>,
    @InjectConnection() private readonly connection: Connection,
  ) {}
  async create(
    createReservationDto: CreateReservationDto
  ): Promise<Reservation> {
    console.log(createReservationDto);
    const Transaction = await this.connection.startSession();
    let savedReservation:any;
    try {
      Transaction.startTransaction();
      const availability = await this.bookModel.findById(createReservationDto.bookId);
      if (!availability) throw new NotFoundException('Book not found');
      if (availability.quantity < 1) throw new NotFoundException('Book out of stock');
      const user = await this.userModel.findById(createReservationDto.userId);
      if (!user) throw new NotFoundException('User not found');
      const savedReservation = await this.reservationModel.create(createReservationDto);
      await availability.updateOne({ $inc: { quantity: -1 } });
      await user.updateOne({ $push: { reservations: savedReservation._id } });
      await Transaction.commitTransaction();
    } catch (er) {
      console.log(er)
      await Transaction.abortTransaction();
    } finally {
      Transaction.endSession();
    }
    return savedReservation;
  }

  findAll() {
    return this.reservationModel.find().populate(['userId', 'bookId']);
  }

  findOne(id: string) {
    return this.reservationModel.findById(id).populate(['userId', 'bookId']);
  }

  async borrowInSite(ReservationId: string) {
    return await this.reservationModel.findByIdAndUpdate(ReservationId, {
      status: 'borrowed',
    });
  }
 async returnInSite(ReservationId: string) {
  const session = await this.connection.startSession();
  try{
    const returned = await this.reservationModel.findByIdAndUpdate(ReservationId, {
      status: 'returned',
    });
    await this.bookModel.findByIdAndUpdate(returned.bookId,{ $inc: { quantity: +1 } });
    await session.commitTransaction();
  }catch(err){
     await session.abortTransaction();
     throw err
  }finally{
      await session.endSession();
  }
  
 }
  async remove(id: string) {
    const session = await this.connection.startSession();
    try{
      session.startTransaction();
      const removedReservation = await this.reservationModel.findByIdAndDelete({_id: id,});
      await this.bookModel.findByIdAndUpdate(removedReservation.bookId,{ $inc: { quantity: +1 } });
     await session.abortTransaction();
     return removedReservation;
    }catch(err){
      await session.abortTransaction();
      throw err
    }finally{
     await session.endSession();
    }
  }
}

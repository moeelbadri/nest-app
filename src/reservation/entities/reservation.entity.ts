import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import mongoose, { HydratedDocument, Types } from 'mongoose';
import { reservationStatus } from 'src/constants/enums';
import { Transform } from 'class-transformer';
export type BookDocument = HydratedDocument<Reservation>;

@Schema({ timestamps: true, autoIndex: true })
export class Reservation {
  @Transform((value) => {
    if (value.obj) return value.obj._id.toString();
  })
  @ApiProperty({
    type: String,
    required: true,
    description: 'The unique identifier',
    example: 'qweqe2dweqfqeqweqweqwe221',
  })
  @Expose()
  _id: string;
  
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Book', required: true })
  bookId: mongoose.Schema.Types.ObjectId;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true })
  userId: mongoose.Schema.Types.ObjectId;

  @Prop({ enum: reservationStatus, default: reservationStatus.RESERVED })
  status: string;

  @Prop({ type: Date })
  returnDate: string;
}

export const ReservationSchema = SchemaFactory.createForClass(Reservation);

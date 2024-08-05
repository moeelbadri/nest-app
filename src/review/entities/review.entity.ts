import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Expose, Transform, Exclude } from 'class-transformer';
import mongoose, { Document } from 'mongoose';

export type ReviewDocument = Review & Document;

@Schema({ timestamps: true, autoIndex: true })
export class Review {
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
   
  @ApiProperty({
    type: String,
    required: true,
    description: 'The unique identifier',
    example: 'qweqe2dweqfqeqweqweqwe221',
  })
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Book', required: true })
  @Expose()
  bookId: string;

  @ApiProperty({
    type: String,
    required: true,
    description: 'The unique identifier',
    example: 'qweqe2dweqfqeqweqweqwe221',
  })
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true })
  @Expose()
  userId: string;
}

export const ReviewSchema = SchemaFactory.createForClass(Review);
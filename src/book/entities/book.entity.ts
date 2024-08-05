import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Expose, Transform, Exclude } from 'class-transformer';
import mongoose, { Document } from 'mongoose';

export type BookDocument = Book & Document;

@Schema({ timestamps: true, autoIndex: true })
export class Book {
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
    description: 'The name of the book',
    example: 'The Great Gatsby',
  })
  @Prop({ required: true })
  @Expose()
  title: string;
  
  @ApiProperty({
    type: String,
    required: true,
    description: 'The author of the book',
    example: 'F. Scott Fitzgerald',
  })
  @Prop({ required: true })
  @Expose()
  author: string;
 
  @ApiProperty({
    type: String,
    required: true,
    description: 'ISBN of the book',
    example: '1234567890123',
  })
  @Prop({ required: true, unique: true })
  ISBN: string;

  @ApiProperty({
    type: Number,
    required: true,
    description: 'Quantity of the book',
    example: 5,
  })
  @Prop({ required:true })
  quantity: number
}

export const BookSchema = SchemaFactory.createForClass(Book);
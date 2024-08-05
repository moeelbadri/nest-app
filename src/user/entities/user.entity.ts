import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Expose, Transform, Exclude } from 'class-transformer';
import mongoose, { Document } from 'mongoose';
import { roles } from 'src/constants/enums';
import * as bcrypt from 'bcryptjs';
export type UserDocument = User & Document;

@Schema({ timestamps: true, autoIndex: true })
export class User {
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

  @Expose()
  @ApiProperty({
    type: String,
    required: true,
    description: 'name',
    example: 'Youssef',
  })
  @Prop({ type: String, required: true })
  name: string;

  @Expose()
  @ApiProperty({
    type: String,
    required: true,
    description: 'email',
    example: 'example@email.com',
  })
  @Prop({ type: String, required: true , unique: true })
  email: string;

  @Exclude()
  @Prop({ type: String })
  password: string;
  
  @Expose()
  @ApiProperty({
    type: String,
    required: true,
    description: 'role',
    example: 'admin',
  })
  @Prop({ type: String, enum: roles, default: roles.USER })
  role: typeof roles;
  
  passwordCheck: (password: string) => Promise<boolean>;
}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.pre('save', async function (this: UserDocument, next: any) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

UserSchema.methods.passwordCheck = async function (password: string) {
  const isPassword = await bcrypt.compare(password, this.password);
  return isPassword;
};
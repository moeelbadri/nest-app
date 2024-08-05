import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { SignupUserDto } from './dto/signup-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './entities/user.entity';
@Injectable()
export class UserService {
    constructor(
        @InjectModel(User.name) private readonly userRepo: Model<User>,
    ) {}
  
  signup(signupUserDto: SignupUserDto) {
    return this.userRepo.create(signupUserDto);
  }

  async login(loginUserDto: LoginUserDto,session: any) : Promise<any> {
    const user = await this.userRepo.findOne({ email: loginUserDto.email });
    if(!user) throw new NotFoundException('Email or Password is incorrect');
    const isMatch = await user.passwordCheck(loginUserDto.password);
    if(!isMatch) throw new UnauthorizedException('Email or Password is incorrect');
    if(isMatch){
      const{ email,name,role,_id} = user;
      session.user = {email,name,role,_id};
      return session.user;
    } 
  }

  findAll() {
    return this.userRepo.find();
  }

  findOne(id: string) {
    return this.userRepo.findById(id);
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    return this.userRepo.findByIdAndUpdate(id, updateUserDto);
  }

  remove(id: string) {
    return this.userRepo.findByIdAndDelete(id);
  }
}

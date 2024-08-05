import { Controller, Get, Post, Body, Patch, Param, Delete, Session } from '@nestjs/common';
import { UserService } from './user.service';
import { SignupUserDto } from './dto/signup-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Authenticated } from 'src/decorators/auth.decorator';
import { roles } from 'src/constants/enums';
import { Serialize } from 'src/interceptors/serialize.intercepter';
import { UserDto } from './dto/user.dto';
import { MongoIDValid } from 'src/decorators/mongoID.decorator';
@Serialize(UserDto)
@MongoIDValid()
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('signup')
  signup(@Body() SignupUserDto:SignupUserDto ) {
    return this.userService.signup(SignupUserDto);
  }
  
  @Post('login')
  login(@Body() loginUserDto: LoginUserDto , @Session() session: any) {
    return this.userService.login(loginUserDto,session);
  }

  @Get()
  @Authenticated(roles.ADMIN)
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  @Authenticated(roles.ADMIN)
  findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }
}

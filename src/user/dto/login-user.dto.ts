import { IsEmail, IsString ,IsNotEmpty, MinLength } from 'class-validator';
export class LoginUserDto {
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(6)
    password: string;
}

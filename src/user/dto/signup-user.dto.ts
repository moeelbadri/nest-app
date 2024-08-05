import { IsEmail, IsString ,IsNotEmpty, MinLength, IsOptional, IsEnum } from 'class-validator';
import { roles } from 'src/constants/enums';
export class SignupUserDto {
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(6)
    password: string;

    @IsOptional()
    @IsEnum(roles)
    role: typeof roles
}

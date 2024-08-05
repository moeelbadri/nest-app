import {IsString , IsNotEmpty, IsNumber } from "class-validator";

export class CreateBookDto {
    @IsNotEmpty()
    @IsString()
    title: string;
     
    @IsNotEmpty()
    @IsString()
    author:string

    @IsNotEmpty()
    @IsString()
    ISBN:string

    @IsNotEmpty()
    @IsNumber()
    quantity:number
}

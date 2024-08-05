import { IsMongoId, IsNotEmpty, IsString} from 'class-validator';

export class CreateReservationDto {
    @IsNotEmpty()
    @IsString()
    @IsMongoId()
    bookId: string;

    @IsNotEmpty()
    @IsString()
    @IsMongoId()
    userId: string;
}

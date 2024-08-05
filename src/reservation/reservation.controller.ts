import { Controller, Get, Post, Body, Patch, Param, Delete, Session } from '@nestjs/common';
import { ReservationService } from './reservation.service';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { MongoIDValid } from 'src/decorators/mongoID.decorator';
import { roles } from 'src/constants/enums';
import { Authenticated } from 'src/decorators/auth.decorator';

@MongoIDValid()
@Controller('reservation')
export class ReservationController {
  constructor(private readonly reservationService: ReservationService) {}

  @Post()
  @Authenticated(roles.USER) 
  create(@Body() createReservationDto: CreateReservationDto, @Session() session: any) {
    return this.reservationService.create(createReservationDto,);
  }

  @Post('borrow')
  @Authenticated(roles.ADMIN) 
  borrowInSite(@Body() ReservationId: string) {
    return this.reservationService.borrowInSite(ReservationId);
  }

  @Post('return')
  @Authenticated(roles.ADMIN)
  returnInSite(@Body() ReservationId: string) {
    return this.reservationService.returnInSite(ReservationId);
  }
  @Get()
  @Authenticated(roles.ADMIN)
  findAll() {
    return this.reservationService.findAll();
  }
  
  @Get(':id')
  @Authenticated(roles.USER,"reservationService")
  findOne(@Param('id') id: string) {
    return this.reservationService.findOne(id);
  }


  @Delete(':id')
  @Authenticated(roles.ADMIN)
  remove(@Param('id') id: string) {
    return this.reservationService.remove(id);
  }
}

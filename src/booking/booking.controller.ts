import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { BookingService } from './booking.service';
import { CreateBookingDto } from './dto/CreateBookingDto.dto';

@Controller('booking')
export class BookingController {
  constructor(private bookingService: BookingService) {}

  @Post()
  create(@Body() Booking: CreateBookingDto) {
    return this.bookingService.createBooking(Booking);
  }

  @Get()
  getBookings(@Query() queryBooking: any) {
    return this.bookingService.getBookings(queryBooking);
  }

  @Get(':id')
  showBooking(@Param('id') id: string) {
    return this.bookingService.showBooking(id);
  }

  @Put(':id')
  updateBooking(
    @Param('id') id: string,
    @Body() bookingData: CreateBookingDto,
  ) {
    return this.bookingService.updateBooking(id, bookingData);
  }

  @Delete(':id')
  deleteUser(@Param('id') id: string) {
    return this.bookingService.deleteBooking(id);
  }

  @Put('change-status-Data-booking/:bookingId')
  setBookingStatusTypeAndPaid(
    @Param('bookingId') bookingId: string,
    @Query() queryBooking: any,
  ) {
    return this.bookingService.setBookingStatusTypeAndPaid(
      bookingId,
      queryBooking,
    );
  }
}

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

  @Put('change-status/:bookingId')
  setBookingStatus(
    @Param('bookingId') bookingId: string,
    @Body() newStatus: Record<string, string>,
  ) {
    return this.bookingService.setBookingStatus(bookingId, newStatus);
  }

  @Put('change-type/:bookingId')
  setBookingType(
    @Param('bookingId') bookingId: string,
    @Body() newType: Record<string, string>,
  ) {
    return this.bookingService.setBookingType(bookingId, newType);
  }

  @Put('change-paid/:bookingId')
  setBookingPaid(
    @Param('bookingId') bookingId: string,
    @Body() newPaidStatus: Record<string, boolean>,
  ) {
    return this.bookingService.setBookingPaid(bookingId, newPaidStatus);
  }

  @Put('change-date/:bookingId')
  setBookingDate(
    @Param('bookingId') bookingId: string,
    @Body() newDate: Record<string, string>,
  ) {
    return this.bookingService.setBookingDate(bookingId, newDate);
  }
}

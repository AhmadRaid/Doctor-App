//import { Type } from 'class-transformer';
//import { Type } from 'class-transformer';
import { IsEnum, IsMongoId, IsString } from 'class-validator';

enum StatusBooking {
  ACTIVE = 'Active',
  CANCELED = 'Canceled',
}

enum TypeBooking {
  NEW_BOOKING = 'New_Booking',
  REVIEW = 'Review',
}

export class CreateBookingDto {
  @IsMongoId()
  doctorId: string;

  @IsMongoId()
  patientId: string;

  // @IsDate() //This decorator is used to validate whether a property is a valid Date object
  // @Type(() => Date) //This decorator is used to transform a property's value into a specific type. In this case, it's used to transform a value into a Date object.
  // @IsISO8601()
  @IsString()
  time: string;

  @IsString()
  date: string;

  @IsEnum(StatusBooking)
  status: StatusBooking;

  @IsEnum(TypeBooking)
  type: TypeBooking;
}

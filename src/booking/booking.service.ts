import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Booking, BookingDocument } from './schema/booking.schema';
import { CreateBookingDto } from './dto/CreateBookingDto.dto';
import { Patient, PatientDocument } from 'src/patient/schema/patient.schema';
import { ObjectId } from 'mongodb'; // Import ObjectId from mongodb
import { Doctor, DoctorDocument } from 'src/doctors/schema/doctor.schema';

@Injectable()
export class BookingService {
  constructor(
    @InjectModel(Booking.name) private BookingModel: Model<BookingDocument>,
    @InjectModel(Patient.name) private PatientModel: Model<PatientDocument>,
    @InjectModel(Doctor.name) private DoctorModel: Model<DoctorDocument>,
  ) {}

  async createBooking(BookingData: CreateBookingDto): Promise<BookingDocument> {
    const { doctorId, patientId, time, date, status, type } = BookingData;

    const existingBooking = await this.BookingModel.findOne({
      doctor: doctorId,
      time,
      date,
      status: 'Active',
    });

    if (existingBooking) {
      throw new ConflictException(
        'Booking with the same doctor and time already exists',
      );
    }

    const doctor = await this.DoctorModel.findById(doctorId);

    if (!doctor) {
      throw new ConflictException('Doctor Not Exist ');
    }

    const patient = await this.PatientModel.findById(patientId);

    if (patient) {
      const doctorExists = patient.myDoctors.some((doctor) =>
        doctor.equals(doctorId),
      );

      if (!doctorExists) {
        // Push the doctor to the myDoctor array
        patient.myDoctors.push(new ObjectId(doctorId));

        // Save the updated patient document
        await patient.save();
      }
    } else {
      if (existingBooking) {
        throw new ConflictException('Patients Not Exist ');
      }
    }

    const createdBooking = await this.BookingModel.create({
      doctor: doctorId,
      patient: patientId,
      time,
      date,
      status,
      type,
    });

    return createdBooking;
  }

  async getBookings(queryBooking: any): Promise<any> {
    const { search, sortBy, offset, sortOrder, limit } = queryBooking;

    const pipeline: any[] = [];
    if (search) {
      pipeline.push({
        $match: {
          $or: [
            { name: { $regex: search, $options: 'i' } },
            { description: { $regex: search, $options: 'i' } },
          ],
        },
      });
    }

    pipeline.push(
      { $sort: { [sortBy]: sortOrder === 'asc' ? 1 : -1 } },
      { $limit: limit ? parseInt(limit, 10) : 10 },
      { $skip: offset ? parseInt(offset, 10) : 0 },
    );

    const total = await this.BookingModel.count().exec();

    const data = await this.BookingModel.aggregate(pipeline).exec();

    return {
      total,
      data,
    };
  }

  async showBooking(id: string): Promise<BookingDocument> {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException('Invalid Booking ID.');
    }

    const Booking = await this.BookingModel.findById(id);

    if (!Booking) throw new NotFoundException('No Booking with given ID.');

    return Booking;
  }

  async updateBooking(
    id: string,
    BookingData: CreateBookingDto,
  ): Promise<BookingDocument> {
    const { doctorId, time, patientId } = BookingData;

    if (!Types.ObjectId.isValid(id))
      throw new BadRequestException('Invalid Booking ID.');

    const existingBookingSamePatient = await this.BookingModel.findOne({
      doctor: doctorId,
      patient: patientId,
      time: time,
    });

    if (existingBookingSamePatient) {
      throw new ConflictException('This Time is Booked already for you');
    }

    const existingBookingAnotherPatient = await this.BookingModel.findOne({
      doctor: doctorId,
      time: time,
    });

    if (existingBookingAnotherPatient) {
      throw new ConflictException(
        'Booking with the same doctor and time already exists',
      );
    }

    const updatedBooking = await this.BookingModel.findByIdAndUpdate(
      id,
      BookingData,
      {
        new: true,
      },
    );

    if (!updatedBooking)
      throw new NotFoundException('No Booking with given ID.');

    return updatedBooking;
  }

  async deleteBooking(id: string): Promise<void> {
    if (!Types.ObjectId.isValid(id))
      throw new BadRequestException('Invalid Booking ID.');

    const Booking = await this.BookingModel.findById(id);

    if (!Booking) throw new NotFoundException('No Booking with given ID.');

    await Booking.deleteOne();
  }

  async setBookingStatusTypeAndPaid(
    bookingId: string,
    paidStatus: any,
  ): Promise<BookingDocument> {
    const { Paid, Type, Status } = paidStatus;

    if (!Types.ObjectId.isValid(bookingId)) {
      throw new BadRequestException('Invalid Booking ID.');
    }

    const booking = await this.findBookingById(bookingId);

    if (Paid) {
      booking.paid = Paid;
    }

    if (Type) {
      booking.type = Type;
    }

    if (Status) {
      booking.status = Status;
    }

    await booking.save();

    return booking;
  }

  private async findBookingById(bookingId: string): Promise<BookingDocument> {
    const booking = await this.BookingModel.findById(bookingId);

    if (!booking) {
      throw new NotFoundException('No Booking with given ID.');
    }

    return booking;
  }
}

import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Patient, PatientDocument } from './schema/patient.schema';
import { Model, Types } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { UpdatePatientDto } from './dto/UpdatePatientDto.dto';
import { Booking, BookingDocument } from 'src/booking/schema/booking.schema';

@Injectable()
export class PatientService {
  constructor(
    @InjectModel(Patient.name) private patientModel: Model<PatientDocument>,
    @InjectModel(Booking.name) private bookingModel: Model<BookingDocument>,
  ) {}

  async createPatient(patientData: any): Promise<PatientDocument> {
    const {
      name,
      email,
      password,
      maritalStatus,
      chronicDiseases,
      numberOfFamilyMembers,
    } = patientData;

    const hashedPassword = await bcrypt.hash(password, 10);

    const createdpatient = await this.patientModel.create({
      name,
      email,
      password: hashedPassword,
      maritalStatus,
      chronicDiseases,
      numberOfFamilyMembers,
    });

    return createdpatient;
  }

  async getPatients(querypatient: any): Promise<any> {
    const { search, sortBy, offset, sortOrder, limit } = querypatient;

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

    const total = await this.patientModel.count().exec();

    const data = await this.patientModel.aggregate(pipeline).exec();

    return {
      total,
      data,
    };
  }

  async showPatient(id: string): Promise<PatientDocument> {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException('Invalid patient ID.');
    }

    const patient = await this.patientModel.findById(id);

    if (!patient) throw new NotFoundException('No patient with given ID.');

    return patient;
  }

  async updatePatient(id: string, patientData: UpdatePatientDto) {
    if (!Types.ObjectId.isValid(id))
      throw new BadRequestException('Invalid patient ID.');

    const updatedPatient = await this.patientModel.findByIdAndUpdate(
      id,
      patientData,
      {
        new: true,
      },
    );

    if (!updatedPatient)
      throw new NotFoundException('No patient with given ID.');

    return updatedPatient;
  }

  async deletePatient(id: string): Promise<void> {
    if (!Types.ObjectId.isValid(id))
      throw new BadRequestException('Invalid patient ID.');

    const patient = await this.patientModel.findById(id);

    if (!patient) throw new NotFoundException('No patient with given ID.');

    await patient.deleteOne();
  }

  public async findPatientByEmail(email: string): Promise<PatientDocument> {
    const patient = await this.patientModel.findOne({ email });

    if (!patient) {
      throw new NotFoundException('No Paitent with given email.');
    }

    return patient;
  }

  public async getTodayBooking(patientId: string): Promise<BookingDocument[]> {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
    const day = String(currentDate.getDate()).padStart(2, '0');

    const formattedCurrentDate = `${year}-${month}-${day}`;

    const bookings = await this.bookingModel.find({
      patient: patientId,
      date: {
        $eq: formattedCurrentDate,
      },
    });

    return bookings;
  }

  public async getFutureBooking(patientId: string): Promise<BookingDocument[]> {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
    const day = String(currentDate.getDate()).padStart(2, '0');

    // Create the formatted date string
    const formattedCurrentDate = `${year}-${month}-${day}`;

    const bookings = await this.bookingModel.find({
      patient: patientId,
      date: {
        $gt: formattedCurrentDate,
      },
    });

    return bookings;
  }
}

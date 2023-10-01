import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Doctor, DoctorDocument } from './schema/doctor.schema';
import {
  Category,
  CategoryDocument,
} from 'src/categories/schema/category.schema';
import { UpdateDoctorDto } from './dto/UpdateDoctorData.dto';
import { CreateDoctorDto } from './dto/CreateDoctorData.dto';
import * as uuid from 'uuid'; // Import uuid
import { Booking, BookingDocument } from 'src/booking/schema/booking.schema';
import * as bcrypt from 'bcrypt';

@Injectable()
export class DoctorsService {
  constructor(
    @InjectModel(Doctor.name) private doctorModel: Model<DoctorDocument>,
    @InjectModel(Category.name) private categoryModel: Model<CategoryDocument>,
    @InjectModel(Booking.name) private bookingModel: Model<BookingDocument>,
  ) {}

  async createDoctor(doctorData: CreateDoctorDto): Promise<DoctorDocument> {
    const {
      name,
      email,
      password,
      categoryId,
      medicalSpecialty,
      certificateImages,
      rating,
      bookingPrice,
      discount,
    } = doctorData;

    // Fetch the Category document based on the categoryId
    const category = await this.categoryModel.findById(categoryId);

    if (!category)
      throw new NotFoundException('No Category with the given ID.');

    const certificateFilenames = certificateImages.map((Certificate) => {
      const uniqueFilename = `${uuid.v4()}_${Certificate.filename}`;
      return uniqueFilename;
    });

    const hashedPassword = await bcrypt.hash(password, 10);

    const createdDoctor = await this.doctorModel.create({
      name,
      email,
      password: hashedPassword,
      category: categoryId,
      medicalSpecialty,
      certificateImages: certificateFilenames,
      rating,
      bookingPrice,
      discount,
    });

    return createdDoctor;
  }

  async getDoctors(): Promise<DoctorDocument[]> {
    const Categories = await this.doctorModel.find();

    return Categories;
  }

  async showDoctor(id: string): Promise<DoctorDocument> {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException('Invalid product ID.');
    }

    const doctor = await this.doctorModel.findById(id);

    if (!doctor) throw new NotFoundException('No Doctor with given ID.');

    return doctor;
  }

  async updateDoctor(id: string, doctorData: UpdateDoctorDto): Promise<any> {
    const { categoryId } = doctorData;

    if (!Types.ObjectId.isValid(id))
      throw new BadRequestException('Invalid Doctor ID.');

    // Fetch the Category document based on the categoryId
    const category = await this.categoryModel.findById(categoryId);

    if (!category)
      throw new NotFoundException('No Category with the given ID.');

    const Doctor = await this.doctorModel.findByIdAndUpdate(id, doctorData, {
      new: true,
    });

    if (!Doctor) throw new NotFoundException('No Doctor with given ID.');

    return Doctor;
  }

  async deleteDoctor(id: string): Promise<void> {
    if (!Types.ObjectId.isValid(id))
      throw new BadRequestException('Invalid Doctor ID.');

    const Doctor = await this.doctorModel.findById(id);

    if (!Doctor) throw new NotFoundException('No Doctor with given ID.');

    await Doctor.deleteOne();
  }

  async listDoctorBooking(
    doctorId: string,
    date: Date,
  ): Promise<BookingDocument[]> {
    const myDoctorBooking = await this.bookingModel.find({
      doctor: doctorId,
      date,
    });

    return myDoctorBooking;
  }

  private async findDoctorById(doctorId: string): Promise<DoctorDocument> {
    const doctor = await this.doctorModel.findById(doctorId);

    if (!doctor) {
      throw new NotFoundException('No Doctor with given ID.');
    }

    return doctor;
  }

  public async findDoctorByEmail(email: string): Promise<DoctorDocument> {
    const doctor = await this.doctorModel.findOne({ email });

    if (!doctor) {
      throw new NotFoundException('No Doctor with given email.');
    }

    return doctor;
  }

  public async getBalanceMonthly(
    doctorId: string,
    month: string,
    year: string,
  ) {
    const regexMonthYear = `^${year}-${month}-`;

    let sumProfit = 0;

    const bookings = await this.bookingModel
      .find({
        doctor: doctorId,
        date: { $regex: new RegExp(regexMonthYear, 'i') },
      })
      .exec();

    bookings.forEach((booking: any) => {
      sumProfit += booking.price;
    });

    return sumProfit;
  }

  public async getBalanceYearly(doctorId: string, year: string) {
    const regexYear = `^${year}-`;

    let sumProfit = 0;
    const bookings = await this.bookingModel
      .find({
        doctor: doctorId,
        date: { $regex: new RegExp(regexYear, 'i') },
      })
      .exec();

    bookings.forEach((booking: any) => {
      sumProfit += booking.price;
      console.log(sumProfit);
    });

    return sumProfit;
  }
}

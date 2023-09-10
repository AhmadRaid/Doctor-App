import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Doctor, DoctorDocument } from './schema/doctor.schema';

@Injectable()
export class DoctorsService {
    CategoryModel: any;

    constructor(@InjectModel(Doctor.name) private DoctorModel: Model<DoctorDocument>) { }


    async createDoctor(doctorData: any): Promise<DoctorDocument> {
        const { name, categoryId, medicalSpecialty, Certificates, rating, bookingPrice, discount } = doctorData

        const createdDoctor = await this.DoctorModel.create({
            name,
            category: categoryId,
            medicalSpecialty,
            Certificates,
            rating,
            bookingPrice,
            discount,
        })

        return createdDoctor;
    }


    async getDoctors(): Promise<DoctorDocument[]> {
        const Categories = await this.DoctorModel.find()

        return Categories;
    }


    async showDoctor(id: string): Promise<DoctorDocument> {

        if (!Types.ObjectId.isValid(id)) {
            throw new BadRequestException('Invalid product ID.');
        }

        const categoty = await this.DoctorModel.findById(id);

        if (!categoty) throw new NotFoundException('No Doctor with given ID.');

        return categoty;
    }


    async updateDoctor(id: string, doctorData: Partial<DoctorDocument & { categoryId: string }>): Promise<DoctorDocument> {
        const { name, categoryId, medicalSpecialty, Certificates, rating, bookingPrice, discount } = doctorData

        if (!Types.ObjectId.isValid(id))
            throw new BadRequestException('Invalid Doctor ID.');

        const Doctor = await this.DoctorModel.findById(id);

        if (!Doctor) throw new NotFoundException('No Doctor with given ID.');

        // Fetch the Category document based on the categoryId
        const category = await this.CategoryModel.findById(categoryId);

        if (!category) throw new NotFoundException('No Category with the given ID.');

        Doctor.name = name;
        Doctor.category = category.id;
        Doctor.medicalSpecialty = medicalSpecialty;
        Doctor.Certificates = Certificates;
        Doctor.rating = rating;
        Doctor.bookingPrice = bookingPrice;
        Doctor.discount = discount;

        const updatedDoctor = await Doctor.save();

        return updatedDoctor;

    }

    async deleteDoctor(id: string): Promise<void> {
        if (!Types.ObjectId.isValid(id))
            throw new BadRequestException('Invalid Doctor ID.');

        const Doctor = await this.DoctorModel.findById(id);

        if (!Doctor) throw new NotFoundException('No Doctor with given ID.');

        await Doctor.deleteOne();
    }

}

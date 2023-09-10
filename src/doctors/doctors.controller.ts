import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { DoctorsService } from './doctors.service';
import { CreateDoctorDto } from './dto/doctor.dto';

@Controller('doctors')
export class DoctorsController {

    constructor(private doctorsService: DoctorsService) { }

    @Post()
    createDoctor(@Body() category: CreateDoctorDto) {
        return this.doctorsService.createDoctor(category)
    }

    @Get()
    getDoctors() {
        return this.doctorsService.getDoctors()
    }

    @Get(':id')
    showDoctor(@Param('id') id: string) {
        return this.doctorsService.showDoctor(id)
    }

    @Put(':id')
    updateDoctor(@Param('id') id: string, @Body() doctor: CreateDoctorDto) {
        return this.doctorsService.updateDoctor(id, doctor)
    }

    @Delete(':id')
    deleteUser(@Param('id') id: string) {
        return this.doctorsService.deleteDoctor(id);
    }
}

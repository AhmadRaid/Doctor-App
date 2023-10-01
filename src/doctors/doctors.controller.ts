import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UploadedFiles,
  UseInterceptors,
  UseGuards,
  Request,
} from '@nestjs/common';
import { DoctorsService } from './doctors.service';
import { FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { UpdateDoctorDto } from './dto/UpdateDoctorData.dto';
import { Roles } from 'src/utills/decorators/role.decorator';
import { roleSystemType } from 'src/utills/role/role.enum';
import { DoctorGuard } from 'src/utills/role/doctor.guard';
import { AuthRequest } from 'src/interfaces/customeRequest';

@Controller('doctors')
export class DoctorsController {
  constructor(private doctorsService: DoctorsService) {}

  @Post()
  @UseInterceptors(
    FilesInterceptor('certificateImages', 5, {
      storage: diskStorage({
        destination: './uploads', // Adjust the destination directory
        filename: (req, file, cb) => {
          cb(null, `${file.originalname}`);
        },
      }),
    }),
  )
  createDoctor(
    @UploadedFiles() certificateImages: Express.Multer.File[],
    @Body() doctorData: any,
  ) {
    return this.doctorsService.createDoctor({
      ...doctorData,
      certificateImages,
    });
  }

  @Get()
  getDoctors() {
    return this.doctorsService.getDoctors();
  }

  @Get('profile/:id')
  showDoctor(@Param('id') id: string) {
    return this.doctorsService.showDoctor(id);
  }

  @Put(':id')
  @UseInterceptors(
    FilesInterceptor('certificateImages', 5, {
      storage: diskStorage({
        destination: './uploads', // Adjust the destination directory
        filename: (req, file, cb) => {
          cb(null, `${file.originalname}`);
        },
      }),
    }),
  )
  updateDoctor(@Param('id') id: string, @Body() doctor: UpdateDoctorDto) {
    console.log(doctor);

    return this.doctorsService.updateDoctor(id, doctor);
  }

  @Delete(':id')
  deleteUser(@Param('id') id: string) {
    return this.doctorsService.deleteDoctor(id);
  }

  @Get('list-booking/:date')
  @Roles(roleSystemType.Doctor)
  @UseGuards(DoctorGuard)
  listDoctorBooking(
    @Param('date') date: Date,
    @Request() request: AuthRequest,
  ) {
    return this.doctorsService.listDoctorBooking(request.user._id, date);
  }

  @Get('get-profit/:month/:year')
  getBalanceMonthly(
    @Request() request: AuthRequest,
    @Param('month') month: string,
    @Param('year') year: string,
  ) {
    return this.doctorsService.getBalanceMonthly(request.user._id, month, year);
  }

  @Get('get-profit/:year')
  getBalanceYearly(
    @Request() request: AuthRequest,
    @Param('year') year: string,
  ) {
    return this.doctorsService.getBalanceYearly(request.user._id, year);
  }
}

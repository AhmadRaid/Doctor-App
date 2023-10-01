import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Request,
} from '@nestjs/common';
import { PatientService } from './patient.service';
import { CreatePatientDto } from './dto/CreatePatientDto.dto';
import { UpdatePatientDto } from './dto/UpdatePatientDto.dto';
import { AuthRequest } from 'src/interfaces/customeRequest';

@Controller('patient')
export class PatientController {
  constructor(private patientService: PatientService) {}

  @Post()
  create(@Body() patient: CreatePatientDto) {
    return this.patientService.createPatient(patient);
  }

  @Get()
  getPatients(@Query() queryCategory: any) {
    return this.patientService.getPatients(queryCategory);
  }

  @Get('profile/:id')
  showPatient(@Param('id') id: string) {
    return this.patientService.showPatient(id);
  }

  @Put(':id')
  updatePatient(
    @Param('id') id: string,
    @Body() patientData: UpdatePatientDto,
  ) {
    console.log('12');
    return this.patientService.updatePatient(id, patientData);
  }

  @Delete(':id')
  deleteUser(@Param('id') id: string) {
    console.log('1');
    return this.patientService.deletePatient(id);
  }

  @Get('get-Today-booking')
  getTodayBooking(@Request() request: AuthRequest) {
    return this.patientService.getTodayBooking(request.user._id);
  }

  @Get('get-future-booking')
  getFutureBooking(@Request() request: AuthRequest) {
    return this.patientService.getFutureBooking(request.user._id);
  }
}

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
import { PatientService } from './patient.service';
import { CreatePatientDto } from './dto/CreatePatientDto.dto';
import { UpdatePatientDto } from './dto/UpdatePatientDto.dto';

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

  @Get(':id')
  showPatient(@Param('id') id: string) {
    return this.patientService.showPatient(id);
  }

  @Put(':id')
  updatePatient(
    @Param('id') id: string,
    @Body() patientData: UpdatePatientDto,
  ) {
    return this.patientService.updatePatient(id, patientData);
  }

  @Delete(':id')
  deleteUser(@Param('id') id: string) {
    return this.patientService.deletePatient(id);
  }
}

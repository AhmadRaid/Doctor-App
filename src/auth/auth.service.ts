import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { DoctorsService } from 'src/doctors/doctors.service';
import { PatientService } from 'src/patient/patient.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private configService: ConfigService,
    private patientsService: PatientService,
    private doctorsService: DoctorsService,
  ) {}

  //   async globalLogin(loginPatientData: Record<string, string>) {
  //     const { userType, email, password } = loginPatientData;
  //     let user: PatientDocument | DoctorDocument;

  //     if (userType == 'patient') {
  //       user = await this.patientsService.findPatientByEmail(email);
  //     } else if (userType == 'doctor') {
  //       user = await this.doctorsService.findDoctorByEmail(email);
  //     } else {
  //       throw new ConflictException('You Must Provide User Type Please');
  //     }

  //     if (!user && userType == 'patient') {
  //       throw new ConflictException('Patient Not Exist');
  //     } else {
  //       throw new ConflictException('Doctor Not Exist');
  //     }

  //     if (user.password !== password) {
  //       throw new UnauthorizedException();
  //     }
  //     const payload = { sub: user._id, username: user.name };
  //     return {
  //       access_token: await this.jwtService.signAsync(payload), //signAsync: create access token
  //     };
  //   }

  async loginPatient(loginPatientData: Record<string, string>) {
    const { email, password } = loginPatientData;
    const patient = await this.patientsService.findPatientByEmail(email);

    if (!patient || !(await bcrypt.compare(password, patient.password))) {
      throw new UnauthorizedException();
    }

    const payload = {
      _id: patient._id,
      email: patient.email,
      role: 'patient',
    };
    return {
      message: `Welcome Patient : ${patient.name}`,
      patient,
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async loginDoctor(loginDoctorData: Record<string, string>) {
    const { email, password } = loginDoctorData;
    const doctor = await this.doctorsService.findDoctorByEmail(email);

    if (!doctor || !(await bcrypt.compare(password, doctor.password))) {
      throw new UnauthorizedException();
    }

    const payload = { _id: doctor._id, email: doctor.email, role: 'doctor' };
    return {
      message: `Welcome Doctor: ${doctor.name}`,
      doctor,
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  // async loginAdmin(loginAdminData: Record<string, string>) {
  //   const { email, password } = loginAdminData;
  //   const admin = await this.doctorsService.findDoctorByEmail(email);

  //   if (!admin || !(await bcrypt.compare(password, admin.password))) {
  //     throw new UnauthorizedException();
  //   }

  //   const payload = { sub: admin._id, email: admin.email, role: 'admin' };
  //   return {
  //     message: `Welcome Doctor: ${admin.name}`,
  //     admin,
  //     access_token: await this.jwtService.signAsync(payload),
  //   };
  // }
}

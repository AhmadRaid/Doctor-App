import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { publicRoute } from '../utills/decorators/publicRoute.decorator';

@publicRoute()
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('patient/login')
  loginPatient(@Body() patientData: Record<string, string>) {
    return this.authService.loginPatient(patientData);
  }

  @Post('/doctor/login')
  loginDoctor(@Body() doctorData: Record<string, string>) {
    return this.authService.loginDoctor(doctorData);
  }

  // @publicRoute()
  // @Post('admin/login')
  // loginAdmin(@Body() patientData: Record<string, string>) {
  //   return this.authService.loginAdmin(patientData);
  // }

  // @publicRoute()
  // @Post('/doctor/login')
  // loginAccountant(@Body() doctorData: Record<string, string>) {
  //   return this.authService.loginAccountant(doctorData);
  // }
}

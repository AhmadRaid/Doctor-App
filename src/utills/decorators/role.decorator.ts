import { SetMetadata } from '@nestjs/common';
import { roleSystemType } from 'src/utills/role/role.enum';

export const Roles = (role: roleSystemType) => SetMetadata('role', role);

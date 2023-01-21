import {SetMetadata} from '@nestjs/common';
import { Role } from './clients/entities/role.enum';

export const Roles = (...roles: Role[]) => SetMetadata('roles', roles);

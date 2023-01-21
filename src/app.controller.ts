import { Controller, Get, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthMetaData } from './auth-metadata.guard';
import { AuthGuard } from './auth.guard';
import { Role } from './clients/entities/role.enum';
import { Roles } from './roles';

@Controller()
@UseGuards(AuthGuard)
@Roles(Role.Admin)
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
  @Get('hello')
  @AuthMetaData('skipAuthCheck')
  getPublicHello(): string {
    return this.appService.getHello();
  }
}



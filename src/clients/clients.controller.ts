import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth.guard';
import { Roles } from 'src/roles';
import { RolesGuard } from 'src/roles.guard';
import { ClientsService } from './clients.service';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { Role } from './entities/role.enum';

@Controller('clients')
@UseGuards(AuthGuard, RolesGuard)
export class ClientsController {
  constructor(private readonly clientsService: ClientsService) {}

  @Post()
  @Roles(Role.Writer)
  @UseGuards(RolesGuard)
  create(@Body() createClientDto: CreateClientDto) {
    return this.clientsService.create(createClientDto);
  }

  @Get()
  @Roles(Role.Reader)
  @UseGuards(AuthGuard, RolesGuard)
  findAll() {
    return this.clientsService.findAll();
  }

  @Get(':id')
  @Roles(Role.Reader)
  findOne(@Param('id') id: string) {
    return this.clientsService.findOne(+id);
  }

  @Patch(':id')
  @Roles(Role.Writer)
  update(@Param('id') id: string, @Body() updateClientDto: UpdateClientDto) {
    return this.clientsService.update(+id, updateClientDto);
  }

  @Delete(':id')
  @Roles(Role.Writer)
  remove(@Param('id') id: string) {
    return this.clientsService.remove(+id);
  }
}

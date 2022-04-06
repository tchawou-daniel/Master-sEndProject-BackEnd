import { Controller, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Controller('usersWorkForCompanies')
@UseGuards(AuthGuard())
export class UsersWorkForCompaniesController {}

import { GetUser } from '@api/auth/get-user.decorator';
import { User } from '@api/auth/user.entity';
import { CreateUsersWorkForCompaniesDto } from '@api/usersWorkForCompanies/dto/create-usersWorkForCompanies.dto';
import { GetUsersWorkForComponiesFilterDto } from '@api/usersWorkForCompanies/dto/get-usersWorkForComponaies-filter.dto';
import { UpdateUsersWorkForCompaniesDto } from '@api/usersWorkForCompanies/dto/update-usersWorkForCompanies.dto';
import { UsersWorkForCompanies } from '@api/usersWorkForCompanies/usersWorkForCompanies.entity';
import { UsersWorkForCompaniesService } from '@api/usersWorkForCompanies/usersWorkForCompanies.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiParam } from '@nestjs/swagger';

@Controller('api/v0/usersWorkForCompanies')
@UseGuards(AuthGuard())
export class UsersWorkForCompaniesController {
  private logger = new Logger('UsersWorkForCompaniesController');

  constructor(
    private usersWorkForCompaniesService: UsersWorkForCompaniesService,
  ) {}

  @Get()
  getUsersWorkForCompanies(
    @GetUser() user: User,
    @Query() filterDto?: GetUsersWorkForComponiesFilterDto,
  ): Promise<UsersWorkForCompanies[]> {
    this.logger.verbose(
      `"User ${
        user.firstName
      }" retrieving all users work for companies Filters: ${JSON.stringify(
        filterDto,
      )}`,
    );
    return this.usersWorkForCompaniesService.getUsersWorkForCompanies(
      user,
      filterDto,
    );
  }

  @Get('/:id')
  getUserWorkForCompaniesById(
    @Param('id') id: string,
    @GetUser() user: User,
  ): Promise<UsersWorkForCompanies> {
    return this.usersWorkForCompaniesService.getUserWorkForCompaniesById(
      id,
      user,
    );
  }

  @Get('/usersInASpecificCompany/:companyId')
  getUsersWorkForASpecificCompany(
    @Query() filterDto: GetUsersWorkForComponiesFilterDto,
    @GetUser() user: User,
    @Param('companyId') companyId: string,
  ): Promise<UsersWorkForCompanies[]> {
    return this.usersWorkForCompaniesService.getUsersWorkForASpecificCompany(
      companyId,
    );
  }

  @Get('/userWorkForCompany/:companyId/:userId')
  @ApiParam({ name: 'companyId', type: 'string' })
  @ApiParam({ name: ':userId', type: 'string' })
  getASpecificUserWorkForCompany(
    @Query() filterDto: GetUsersWorkForComponiesFilterDto,
    @GetUser() user: User,
    @Param('companyId') companyId: string,
    @Param('userId') userId: string,
  ): Promise<UsersWorkForCompanies> {
    return this.usersWorkForCompaniesService.getASpecificUserWorkForCompany(
      companyId,
      userId,
    );
  }

  // @Get('/:id')
  // getWorkerOfMyCompany(
  //   @Query() filterDto: GetUsersWorkForComponiesFilterDto,
  //   @GetCompany() companyService: CompanyService,
  //   @GetUsersWorkForCompaniesService()
  //   usersWorkForCompaniesService: UsersWorkForCompaniesService,
  // ) {
  //   companyService.getCompanyByName();
  //   return this.companyService.getCompanyId();
  // }

  @Post()
  createUsersWorkForCompany(
    @Body() createUsersWorkForCompaniesDto: CreateUsersWorkForCompaniesDto,
    @GetUser() user: User,
  ): Promise<UsersWorkForCompanies> {
    return this.usersWorkForCompaniesService.createUsersWorkForCompany(
      createUsersWorkForCompaniesDto,
      user,
    );
  }

  @Patch('/:id')
  updateUsersWorkForCompany(
    @Body() updateEmploymentPeriodDto: UpdateUsersWorkForCompaniesDto,
    @GetUser() user: User,
    @Param('id') id: string,
  ): Promise<UsersWorkForCompanies> {
    this.logger.verbose({ updateEmploymentPeriodDto });
    return this.usersWorkForCompaniesService.updateUsersWorkForCompaniesService(
      id,
      updateEmploymentPeriodDto,
      user,
    );
  }

  // delete from idUser
  @Delete('/:companyId/:userId')
  // @CheckAbilities({ action: Action.Update, subject: User })
  async delete(
    @GetUser() user: User,
    @Param('companyId') companyId: string,
    @Param('userId') userId: string,
  ): Promise<void> {
    await this.usersWorkForCompaniesService.delete(userId, companyId, user);
  }
}

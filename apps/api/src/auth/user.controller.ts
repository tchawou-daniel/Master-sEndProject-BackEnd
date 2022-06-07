import { CheckAbilities } from '@api/ability/abilities.decorator';
import { AbilityFactory, Action } from '@api/ability/ability.factory';
import { GetUsersFliterDto } from '@api/auth/dto/get-users-fliter.dto';
import { GetUser } from '@api/auth/get-user.decorator';
import { User } from '@api/auth/user.entity';
import { UserService } from '@api/auth/user.service';
import { UpdateEmploymentDto } from '@api/employment/dto/update-employment.dto';
import { Employment } from '@api/employment/employment.entity';
import { ForbiddenError } from '@casl/ability';
import {
  Body,
  Controller,
  ForbiddenException,
  Get,
  Logger,
  Param,
  Patch,
  Query,
} from '@nestjs/common';
import { UpdateUserDto } from '@api/auth/dto/update-user.dto';

@Controller('/api/v0/users')
export class UserController {
  private logger = new Logger('User');

  constructor(
    private userService: UserService,
    private abilityFactory: AbilityFactory,
  ) {}

  // Get all User
  @Get('/')
  @CheckAbilities({ action: Action.Read_All, subject: User })
  getUsers(
    @Query() filterDto: GetUsersFliterDto,
    @GetUser() user: User,
  ): Promise<User[]> {
    const ability = this.abilityFactory.defineAbility(user);
    try {
      ForbiddenError.from(ability).throwUnlessCan(Action.Read_All, User);
      return this.userService.getUsers(filterDto);
    } catch (error) {
      if (error instanceof ForbiddenError) {
        throw new ForbiddenException(error.message);
      }
    }
  }

  @Get('/:id')
  @CheckAbilities({ action: Action.Read_All, subject: User })
  getUserById(@Param('id') id: string, @GetUser() user: User): Promise<User> {
    const ability = this.abilityFactory.defineAbility(user);
    try {
      ForbiddenError.from(ability).throwUnlessCan(Action.Read_All, User);
      return this.userService.getUserById(id);
    } catch (error) {
      if (error instanceof ForbiddenError) {
        throw new ForbiddenException(error.message);
      }
    }
  }

  @Get('/me/:email')
  getUserByEmail(@Param('email') email: string): Promise<User> {
    try {
      return this.userService.getUserByEmail(email);
    } catch (error) {
      if (error instanceof ForbiddenError) {
        throw new ForbiddenException(error.message);
      }
    }
  }

  @Patch('/me/:id')
  updateMe(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<User> {
    return this.userService.updateMe(id, updateUserDto);
  }
}

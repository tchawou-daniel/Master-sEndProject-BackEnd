import { CheckAbilities } from '@api/ability/abilities.decorator';
import { AbilityFactory, Action } from '@api/ability/ability.factory';
import { GetUsersFliterDto } from '@api/auth/dto/get-users-fliter.dto';
import { UpdateUserDto } from '@api/auth/dto/update-user.dto';
import { GetUser } from '@api/auth/get-user.decorator';
import { User } from '@api/auth/user.entity';
import { UserService } from '@api/auth/user.service';
import { ForbiddenError } from '@casl/ability';
import {
  Body,
  Controller,
  ForbiddenException,
  Get,
  Logger,
  Param,
  Patch, Post,
  Query, UseGuards,
} from '@nestjs/common';
import { CreateUserDto } from '@api/auth/dto/create-user.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('/api/v0/users')
@UseGuards(AuthGuard())
export class AuthController {
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
    Logger.log({ user });
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

  @Get('/workers')
  @CheckAbilities({ action: Action.Read_All, subject: User })
  getWorkers(
    @Query() filterDto: GetUsersFliterDto,
    @GetUser() user: User,
  ): Promise<User[]> {
    Logger.log({ user });
    Logger.log("user");
    const ability = this.abilityFactory.defineAbility(user);
    try {
      ForbiddenError.from(ability).throwUnlessCan(Action.Read_All, User);
      return this.userService.getWorkers(filterDto);
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

  @Post('/worker')
  createAnEmployee(@Body() createUserDto: CreateUserDto): Promise<void> {
    this.logger.verbose(`User "${{ createUserDto }}"`);
    console.log({ createUserDto });

    return this.userService.createAWorker(createUserDto);
  }

  @Patch('/me/:id')
  updateMe(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<User> {
    return this.userService.updateMe(id, updateUserDto);
  }
}

import { CheckAbilities } from '@api/ability/abilities.decorator';
import { AbilityFactory, Action } from '@api/ability/ability.factory';
import { GetUsersFliterDto } from '@api/auth/dto/get-users-fliter.dto';
import { GetUser } from '@api/auth/get-user.decorator';
import { User } from '@api/auth/user.entity';
import { UserService } from '@api/auth/user.service';
import { ForbiddenError } from '@casl/ability';
import { ForbiddenException, Get, Logger, Param, Query } from '@nestjs/common';

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
}

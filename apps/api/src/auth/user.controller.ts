import { AbilityFactory, Action } from '@api/ability/ability.factory';
import { GetUsersFliterDto } from '@api/auth/dto/get-users-fliter.dto';
import { GetUser } from '@api/auth/get-user.decorator';
import { GetRawJwt } from '@api/auth/jwt.decorator';
import { User } from '@api/auth/user.entity';
import { UserService } from '@api/auth/user.service';
import { ForbiddenError } from '@casl/ability';
import { Body, Controller, Get, Logger, Request } from '@nestjs/common';

@Controller('/api/v0/users')
export class UserController {
  private logger = new Logger('User');

  constructor(
    private userService: UserService,
    private abilityFactory: AbilityFactory,
  ) {}

  // Get all User
  // @Get('/')
  // getUsers(
  //   @Query() filterDto: GetUsersFliterDto,
  //   @GetUser() user: User,
  // ): Promise<User[]> {
  //   const ability = this.abilityFactory.defineAbility(user);
  //   try {
  //     ForbiddenError.from(ability).throwUnlessCan(Action.Read_All, User);
  //     return this.userService.getUsers(filterDto);
  //   } catch (error) {
  //     if (error instanceof ForbiddenError) {
  //       throw new ForbiddenException(error.message);
  //     }
  //   }
  // }

  @Get('/me')
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async getAuthenticatedUser(@GetRawJwt() jwt: string): Promise<void> {
    this.logger.log(jwt);
    this.logger.log('user luqsudfoi qsodufoqusdf qsdofiuqsdf qsdofusoidfi');
    // const userToReturn = await this.userService.updateUserAfterConnection(
    //   user.email,
    // );
    // this.logger.log(userToReturn);

    // return userToReturn;
  }

  // @Get('/:id')
  // getUserById(@Param('id') id: string, @GetUser() user: User): Promise<User> {
  //   const ability = this.abilityFactory.defineAbility(user);
  //   try {
  //     ForbiddenError.from(ability).throwUnlessCan(Action.Read_All, User);
  //     return this.userService.getUserById(id);
  //   } catch (error) {
  //     if (error instanceof ForbiddenError) {
  //       throw new ForbiddenException(error.message);
  //     }
  //   }
  // }
}

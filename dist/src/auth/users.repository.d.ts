import { GetUsersFliterDto } from '@api/auth/dto/get-users-fliter.dto';
import { Repository } from 'typeorm';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { User } from './user.entity';
export declare class UsersRepository extends Repository<User> {
    createUser(authCredentialsDto: AuthCredentialsDto): Promise<User>;
    getUsers(): Promise<User[]>;
    getWorkers(filterDto: GetUsersFliterDto, user?: User): Promise<User[]>;
}

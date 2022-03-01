import { Strategy } from 'passport-jwt';
import { UsersRepository } from './users.repository';
import { JwtPayload } from './jwt-payload.interface';
import { User } from './user.entity';
declare const JwtStartegy_base: new (...args: any[]) => Strategy;
export declare class JwtStartegy extends JwtStartegy_base {
    private usersRepository;
    constructor(usersRepository: UsersRepository);
    validate(payload: JwtPayload): Promise<User>;
}
export {};

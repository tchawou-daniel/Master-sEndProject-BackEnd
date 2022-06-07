import { ConfigService } from '@nestjs/config';
import { Strategy } from 'passport-jwt';
import { JwtPayload } from './jwt-payload.interface';
import { User } from './user.entity';
import { UsersRepository } from './users.repository';
declare const JwtStartegy_base: new (...args: any[]) => Strategy;
export declare class JwtStartegy extends JwtStartegy_base {
    private usersRepository;
    private configService;
    constructor(usersRepository: UsersRepository, configService: ConfigService);
    validate(payload: JwtPayload): Promise<User>;
}
export {};

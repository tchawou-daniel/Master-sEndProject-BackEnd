
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { passportJwtSecret } from 'jwks-rsa';
import * as dotenv from 'dotenv';


import { ExtractJwt, Strategy,VerifiedCallback } from 'passport-jwt';
import { InjectRepository } from '@nestjs/typeorm';
// import { UsersRepository } from './users.repository';
import { JwtPayload } from './jwt-payload.interface';
import { User } from './user.entity';


/*@Injectable()
export class JwtStartegy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(UsersRepository)
    private usersRepository: UsersRepository,
  ) {
    super({
      secretOrKey: 'topSecret',
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }
  async validate(payload: JwtPayload): Promise<User> {
    const { username } = payload;
    const user: User = await this.usersRepository.findOne({ username });
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}*/
dotenv.config();


@Injectable()
export class JwtStartegy extends PassportStrategy(Strategy) {
  constructor(
     // @InjectRepository(UsersRepository)
      // private usersRepository: UsersRepository,
  ) {
    super({
      secretOrKeyProvider: passportJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: `${process.env.AUTH0_ISSUER_BASE_URL}/.well-known/jwks.json`,
      }),

      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      issuer: `${process.env.AUTH0_ISSUER_BASE_URL}`,
      algorithms: ['RS256'],
    });
  }

    /*async validate(payload: JwtPayload, done: VerifiedCallback): Promise<User> {
    const { username } = payload;
   // const user: User = await this.usersRepository.findOne({ username });
    if (!user) {
      done(new UnauthorizedException(), false);
    }
    return user;
  }
    //  //https://auth0.com/blog/developing-a-secure-api-with-nestjs-adding-authorization/

  */



    async validate(payload: any, done: VerifiedCallback) {
    if (!payload) {
      done(new UnauthorizedException(), false);
    }

    return done(null, payload);
  }
}
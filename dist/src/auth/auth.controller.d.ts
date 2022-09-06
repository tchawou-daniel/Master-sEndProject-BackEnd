import { CreateUserDto } from '@api/auth/dto/create-user.dto';
import { User } from '@api/auth/user.entity';
import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
export declare class AuthController {
    private authService;
    private logger;
    constructor(authService: AuthService);
    signUp(createUserDto: CreateUserDto): Promise<User>;
    signIn(authCredentialsDto: AuthCredentialsDto): Promise<{
        accessToken: string;
    }>;
    test(req: any): void;
}

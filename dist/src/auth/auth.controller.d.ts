import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { CreateUserDto } from "@api/auth/dto/create-user.dto";
export declare class AuthController {
    private authService;
    private logger;
    constructor(authService: AuthService);
    signUp(createUserDto: CreateUserDto): Promise<void>;
    signIn(authCredentialsDto: AuthCredentialsDto): Promise<{
        accessToken: string;
    }>;
    test(req: any): void;
}

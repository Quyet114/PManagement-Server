import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
constructor(private userService: UserService,
    private jwtService: JwtService){}


async signIn(username: string, pass: string
    ):Promise<any>{
    const user = await this.userService.findUserByUsername(username);

    if(user?.password !==pass){
        throw new UnauthorizedException();
    }
    user.password=undefined;
    const payload = {user:user}
    const token = await this.jwtService.signAsync(payload);
    return {
        data:{
            ...user,
            token
        }
    }
}

}

import { Controller, Get, Head, Header, Headers, Req, Res, UnauthorizedException, UseGuards } from '@nestjs/common';
import { Request, Response } from 'express';
import { AuthService } from './auth.service';


@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService){

    }
    @Get('google')
    async auth(@Headers('token') token, @Headers('client_id') client_id){
        if(!token || !client_id){
            throw new UnauthorizedException();
        }

        return this.authService.verifyCredentials(token, client_id);
    }

    @Get('/google/callback')
    async googleAuthCallback(@Req() req: Request, @Res() res: Response){
        console.log(req.user);
        return {user: req.user}
    }

}
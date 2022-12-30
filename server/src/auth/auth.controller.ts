import { Body, Controller, Get, Head, Header, Headers, Post, Req, Res, UnauthorizedException, UseGuards } from '@nestjs/common';
import { Request, Response } from 'express';
import { AuthService } from './auth.service';
import { BearerDto, LogInDto, SignUpDto } from './dtos';


@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService){

    }
    @Get('google')
    async auth(@Headers('token') token, @Headers('client_id') client_id){
        console.log(token);
        console.log(client_id);
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


    @Post('login')
    async login(@Body() dto: LogInDto){
        dto.type = 'user';
        return this.authService.login(dto)
    }


    @Post('register')
    async signup(@Body() dto: SignUpDto){
        dto.type = 'user';

        return this.authService.register(dto);
    }

    @Post('registration/bearer/completeprofile')

    async bearerCompleteProfile(@Headers('token') token, @Headers('client_id') client_id, @Body() dto : BearerDto) {
        dto.type = 'user';

        return this.authService.bearerCompleteProfile(token, client_id, dto);
    }
    

}
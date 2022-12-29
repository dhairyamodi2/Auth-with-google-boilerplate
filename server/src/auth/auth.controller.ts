import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { Request, Response } from 'express';
import { GoogleOauthGuard } from './guards';



@Controller('auth')
export class AuthController {
    @Get('google')
    @UseGuards(GoogleOauthGuard)
    async auth(){
        return "hello";
    }

    @Get('/google/callback')
    @UseGuards(GoogleOauthGuard)
    async googleAuthCallback(@Req() req: Request, @Res() res: Response){
        console.log(req.user);
        res.redirect('http://localhost:3000/');
    }

}
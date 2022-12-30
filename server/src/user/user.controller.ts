import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';

@Controller('user')
export class UserController {

    @Get('me')
    @UseGuards(AuthGuard('jwt'))
    me(@Req() req : Request){
        return {success: true, user : req.user}
    }
}

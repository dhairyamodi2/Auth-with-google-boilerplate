import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtService } from '@nestjs/jwt';
import { JwtStrategy } from './strategies/jwt.strategy';


@Module({
  providers: [AuthService , JwtService, JwtStrategy],
  controllers: [AuthController]
})
export class AuthModule {

}

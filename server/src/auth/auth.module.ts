import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { GoogleOauthGuard } from './guards';
import { GoogleOauthStrategy } from './strategies';


@Module({
  providers: [AuthService, GoogleOauthGuard, GoogleOauthStrategy],
  controllers: [AuthController]
})
export class AuthModule {

}

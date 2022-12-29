import { Injectable } from "@nestjs/common";
import {AuthGuard} from "@nestjs/passport"

@Injectable()
export class GoogleOauthGuard extends AuthGuard("google"){

}

@Injectable()
export class JwtGuard extends AuthGuard("jwt"){

}
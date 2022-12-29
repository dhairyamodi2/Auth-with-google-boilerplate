import { Injectable } from "@nestjs/common";
import {PassportStrategy} from "@nestjs/passport";
import {Strategy as googleStrategy, VerifyCallback} from "passport-google-oauth2";
import {Strategy as jwtStrategy} from "passport-jwt";

@Injectable({})
export class GoogleOauthStrategy extends PassportStrategy(googleStrategy, 'google'){
    constructor(){
        console.log(process.env.google_client_id);
        super({
            clientID: "885646979112-04k64t2b5po5i9mjm2t0n9h2lvlpci22.apps.googleusercontent.com",
            clientSecret: process.env.google_client_secret,
            callbackURL: process.env.google_callback_url,
            scope: ['profile', 'email']
        })
    }

    async validate(accessToken: string, refreshToken: string, profile: any, done: VerifyCallback): Promise<any> {
        console.log(profile)
        done(null, profile)
    }
}

export class JwtStrategy extends PassportStrategy(jwtStrategy, 'jwt'){
    constructor(){
        super({
            
        })
    }
}
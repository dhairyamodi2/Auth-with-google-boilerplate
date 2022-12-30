import { ConflictException, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { OAuth2Client } from 'google-auth-library';
import { PrismaService } from 'src/prisma/prisma.service';
import { BearerDto, LogInDto, SignUpDto } from './dtos';
import * as argon from 'argon2'
import {JwtService} from "@nestjs/jwt"

const client = new OAuth2Client(
    process.env.google_client_id,
    process.env.google_client_secret
)


@Injectable()
export class AuthService {
    constructor(
        private prisma : PrismaService,
        private jwt : JwtService){}
    async verifyCredentials(token: string, client_id: string) {

        try {
            const ticket = await client.verifyIdToken({
                idToken: token,
                audience: client_id
            })

            const user_data = ticket.getPayload();

            const user = await this.prisma.user.findUnique({where: {email: user_data.email}});

            if(user){

                const Jwt_token = await this.generateToken(user.id, user.email, user.type);
                return {
                    success: false,
                    message: "User already exist!",
                    data: {
                        userAlreadyExist: true,
                        token: Jwt_token,
                        user
                    }
                }
            }
            return {
                success: true,
                message: "",
                data: {
                    userAlreadyExist: false,
                    name: user_data.name,
                    email: user_data.email
                }
            }
        } catch (error) {
            return {success: false, error: "Session expired please try again!"}
        }

    }

    async login(body: LogInDto){
        try {
            const payload = body;

            const user = await this.prisma.user.findUnique({where: {email: payload.email}});

            if(!user){
                return {success: false, message: "Invalid credentials", data: {}}
            }

            let passwordMatches = await argon.verify(user.password, payload.password);
            
            if(!passwordMatches){
                return {success: false, message: "Invalid credentials", data: {}}
            }

            const token = await this.generateToken(user.id, user.email, user.type);
            return {success: true, message: "", data: {token, user}}

        } catch (error) {
            return {success: false, message: error.message, data: {}}
        }
    }
    async register(body : SignUpDto){
        try {
            const payload = body;
            payload.password = await argon.hash(payload.password);

            const user = await this.prisma.user.create({data: payload});
            delete user.password;

            const token = await this.generateToken(user.id, user.email, user.type)
            
            return {succcess: true, message: "", data: {token, user}}

        } catch (error) {
            return {success: false, message: error.message, data: {}}
        }
    }

    async bearerCompleteProfile(token : string, client_id: string, body : BearerDto){
        try {
            const ticket = await client.verifyIdToken({
                idToken: token,
                audience: client_id
            })

            const payload = body;
            let user_data = ticket.getPayload();

            if(user_data.email !== body.email || user_data.name !== body.name){
                throw new ConflictException('Please try again');
            }

            let user = await this.prisma.user.create({data: payload})
            delete user.password;

            const Jwt_token = await this.generateToken(user.id,  user.email, user.type);

            return {success: true, message: "", data: {user, token: Jwt_token}}

        } catch (error) {
            return {success: false, error: error.message}
        }
    }


    async generateToken(id, email: string, type: string) : Promise<string>{
        try {
            const payload = {
                id, email, type
            }

            return this.jwt.signAsync(payload, {
                expiresIn: process.env.JWT_EXPIRE,
                secret:process.env.JWT_SECRET
            })
        } catch (error) {
            throw error;
        }
    }
}

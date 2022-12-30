import { IsEmail, isNotEmpty, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class SignUpDto{

    @IsNotEmpty()
    name: string;


    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsNotEmpty()
    password: string;

    @IsOptional()
    type: string;

    @IsNotEmpty()
    mobileNumber: string
    
    @IsNotEmpty()
    country: string

    @IsNotEmpty()
    region: string


}


export class LogInDto{
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsNotEmpty()
    password: string;

    @IsOptional()
    type: string;
}


export class BearerDto {

    @IsNotEmpty()
    name: string;


    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsNotEmpty()
    password: string;

    @IsOptional()
    type: string;

    @IsNotEmpty()
    mobileNumber: string
    
    @IsNotEmpty()
    country: string

    @IsNotEmpty()
    region: string

}
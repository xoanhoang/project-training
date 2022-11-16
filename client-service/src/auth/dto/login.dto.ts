import { IsEmail, IsNotEmpty, IsString, MinLength } from "@nestjs/class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { Tracing } from "trace_events";

export class LoginDto {
    @IsEmail()
    @ApiProperty()
    email : string;

    @IsNotEmpty()
    @IsString()
    @ApiProperty({type :String,description:'password'})
    password : string;
}
export class createUserDto{
    @IsEmail()
    @ApiProperty({type :String,description:'email'})
    email : string;

    @IsNotEmpty()
    @IsString()
    @MinLength(8)
    @ApiProperty({type :String,description:'password'})
    password : string;

    @IsNotEmpty()
    @IsString()
    @ApiProperty({type :String,description:'username'})
    username : string;

    @IsNotEmpty()
    @ApiProperty({type :String,description:'phoneNumber'})
    phoneNumber : string;

    @IsNotEmpty()
    @ApiProperty({type :String,description:'address'})
    address : string;
}

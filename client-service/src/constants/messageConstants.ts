import { HttpCode, HttpStatus } from "@nestjs/common";

export enum systemCode {
    SUCCESS = 'Your request has been processed successfully',
    SORRY_SOMETHING_WENT_WRONG= 'Sorry something went wrong',
    BAD_REQUEST = 'Bad request',
    INVALID_TOKEN = 'Invalid Token',
    FORBIDDEN ='Forbidden',
    UNAUTHORIZED = 'Unauthorized',
    NOT_FOUND = 'Data not found',
    USER_NOT_FOUND = 'User not found',
    USERNAME_OR_PASSWORD_INVALID = 'Username or password invalid',
    USER_ALREADY_EXISTS = "User already exists" 
}
import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { formatResponseDTO } from 'src/constants/common';
import { systemCode } from 'src/constants/messageConstants';
import { MailService } from 'src/mail/mail.service';
import { createUserDto, LoginDto } from './dto/login.dto';
import { UsersService } from './user.service';

@Injectable()
export class AuthService {
    constructor(
        private userService: UsersService,
        private jwtService: JwtService,
        private mailService: MailService
    ) { }

    async login(dataLogin: LoginDto): Promise<formatResponseDTO> {
        const user = await this.validateUser(dataLogin);
        if (!user) {
            return {
                data: undefined,
                message: "Email and password do not match",
                systemCode: systemCode.USER_NOT_FOUND
            }
        }
        const payload = { id: user.id, email: user.email };
        return {
            systemCode: systemCode.SUCCESS,
            message: "Logging Successfully",
            data: this.jwtService.sign(payload, { secret: 'hardsecret' }),      
        };
    }

    async validateUser(dataLogin: LoginDto) {
        const user = await this.userService.findUserByEmail(dataLogin.email);
        const isPassMatching = await bcrypt.compareSync(
            dataLogin.password, user.password 
        );

        if (user && user.isEmailConfirmed) {
            if (user && isPassMatching) {
                const { password, ...result } = user;
                return result;
            } 
            return null;
        }
        return null;
    }

    async registerUser(user: createUserDto) : Promise<formatResponseDTO> {
        const payload = { email: user.email };
        let access_token = this.jwtService.sign(payload, { secret: 'hardsecret' })
        await this.mailService.sendUserConfirmation(user, access_token);
        return {
            systemCode: systemCode.SUCCESS,
            message: "Register Successfully",
            data: undefined
        }

    }

}

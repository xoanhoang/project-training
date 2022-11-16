import { Body, Controller, Get, Param, Post, Request, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { createUserDto, LoginDto } from './dto/login.dto';
import { JwtAuthGuard } from './jwt-auth.guard';
import { UsersService } from './user.service';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
    constructor(
        private authService: AuthService,
        private userService: UsersService
    ) { }

    @Post()
    login(@Body() dataLogin: LoginDto) {
        return this.authService.login(dataLogin);
    }

    @UseGuards(JwtAuthGuard)
    @Get('profile')
    getUserLogin(@Request() req) {
        return req.user;
    }

    @Post('register')
    async registerUser(@Body() user: createUserDto) {
        await this.userService.createUser(user);
        return await this.authService.registerUser(user);
    }

    @Get('confirm/:email')
    confirm(@Param('email') email: string) {
        return this.userService.markEmailAsConfirmed(email)
    }


}

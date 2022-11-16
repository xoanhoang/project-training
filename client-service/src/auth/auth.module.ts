import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersService } from './user.service';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/models/users.entity';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports : [TypeOrmModule.forFeature([User]),JwtModule.register({
    secret: 'hardsecret',
    signOptions: { expiresIn: '1d'},
  })],
  providers: [AuthService,UsersService,JwtService,JwtStrategy],
  controllers: [AuthController]
})
export class AuthModule {}

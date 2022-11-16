import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { createUserDto } from 'src/auth/dto/login.dto';

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) { }

  async sendUserConfirmation(user: createUserDto, token: string) {
    const url = `http://localhost:3000/auth/confirm/${user.email}`;
    console.log(url);
    await this.mailerService.sendMail({
      to: user.email,
      // from: '"htxoanbk@gmail.com" <htxoanbk@gmail.com>',
      subject: 'Welcome to App! Confirm your Email',
      template: './confirmation',
      context: {
        name: user.email,
        url,
      },
    })
      .then((success) => {
        console.log(success);
      })
      .catch((err) => {
        console.log(err);
      });
  }
}

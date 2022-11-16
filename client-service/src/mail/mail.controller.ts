import { MailerService } from '@nestjs-modules/mailer';
import { Controller, Get, Query } from '@nestjs/common';

@Controller('email')
export class EmailController {
    constructor(private mailService: MailerService) {}
    @Get()
  async plainTextEmail(@Query('toemail') toEmail) { 
    console.log(toEmail);
    
  var response = await this.mailService.sendMail({
   to:toEmail,
   from:"htxoanbk@gmail.com",
   subject: 'Plain Text Email',
   text: 'Send Mail',  
  });
  return response;
}
}

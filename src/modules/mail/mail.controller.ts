import { Body, Controller, Post } from '@nestjs/common';
import { MailService } from 'src/modules/mail/mail.service';

@Controller('api/v1/mail')
export class MailController {
  constructor(private readonly mailService: MailService) {}

  @Post('send-welcome')
  async sendWelcome(@Body() request: { to: string; name: string }) {
    await this.mailService.sendWelcomeEmail(request.to, request.name);
    return { message: 'Email sent successfully' };
  }
}

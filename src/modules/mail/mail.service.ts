import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}

  async sendWelcomeEmail(to: string, name: string) {
    try {
      await this.mailerService.sendMail({
        to,
        subject: 'Welcome to Our App!',
        template: './welcome', // Tên template trong thư mục templates, phải copy templaste thủ công "npm run copy:templates"
        context: { name, action_url: 'https://your-app.com/dashboard', year: new Date().getFullYear() },
        // text: `Hello ${name}, welcome to our application!`,
        // html: `<p>Hello <b>${name}</b>,</p><p>Welcome to our application!</p>`,
      });
      console.log(`Email sent to ${to}`);
    } catch (error) {
      console.error(`Failed to send email to ${to}:`, error);
      throw error;
    }
  }
}


import { Module } from '@nestjs/common';
import { MailService } from './mail.service';
import { MailerModule } from '@nestjs-modules/mailer';

@Module({
  imports: [
    MailerModule.forRoot({
      defaults: {
        from: '"nest-modules" <modules@nestjs.com>',
      },
      transport: {
        host: 'smtp.gmail.com',
        port: 587,
        secure: false, // TLS
        auth: {
          user: 'claimrequestsystem@gmail.com',
          pass: 'your_app_password', // dùng App Password nếu có 2FA, cau hinh google
        },
      },
    }),
  ],
  controllers: [MailService],
})
export class MailModule {}
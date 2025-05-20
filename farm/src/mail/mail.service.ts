import { MailerService } from "@nestjs-modules/mailer";
import { Controller } from "@nestjs/common";
@Controller('mail')
export class MailService {
    constructor(private readonly mailerService: MailerService) {}
    public async example(): Promise<void> {
        await this.mailerService
          .sendMail({
            to: 'cuongnvtse160875@fpt.edu.vn', // list of receivers
            from: 'cuongnvtse160875@gmail.com', // sender address
            subject: 'Testing Nest MailerModule ✔', // Subject line
            text: 'welcome', // plaintext body
            html: '<b>welcome</b>', // HTML body content
          })
      }
}

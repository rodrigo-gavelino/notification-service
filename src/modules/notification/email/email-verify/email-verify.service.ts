import { RabbitMqMessagingService } from '@core/infrastructure/messaging/rabbit-mq-messaging.service';
import { OnModuleInit, Injectable, Inject } from '@nestjs/common';
import { RABBITMQ_MESSAGING_SERVICE } from '../../notification.provider';
import { JwtService } from '@nestjs/jwt';
import { ZohoMailService } from '@core/infrastructure/messaging/zoho-mail.service';

@Injectable()
export class EmailVerifyService implements OnModuleInit {
  constructor(
    @Inject(RABBITMQ_MESSAGING_SERVICE)
    private readonly messagingService: RabbitMqMessagingService,
    private readonly jwrService: JwtService,
    private readonly mailService: ZohoMailService,
  ) {}

  async onModuleInit() {
    await this.messagingService.consume('UserCreatedEvent', async (message) =>
      this.handleUserCreatedEvent(message),
    );
  }

  private async handleUserCreatedEvent(message: any) {
    const payload = this.jwrService.verify(message, {
      secret: process.env.JWT_SECRET,
    });
    console.log('User ID:', payload._id);
    console.log('User email:', payload.email);

    this.mailService.sendMail(payload.email, 'User created', 'User created');
  }
}

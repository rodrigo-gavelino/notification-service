import { RabbitMqMessagingService } from '@core/infrastructure/messaging/rabbit-mq-messaging.service';
import { OnModuleInit, Injectable, Inject } from '@nestjs/common';
import { RABBITMQ_MESSAGING_SERVICE } from './notification.provider';

@Injectable()
export class NotificationService implements OnModuleInit {
  constructor(
    @Inject(RABBITMQ_MESSAGING_SERVICE)
    private readonly messagingService: RabbitMqMessagingService,
  ) {}

  async onModuleInit() {
    await this.messagingService.consume('UserCreatedEvent', async (message) =>
      this.handleUserCreatedEvent(message),
    );
  }

  private async handleUserCreatedEvent(message: any) {
    console.log('Received UserCreatedEvent', message);
  }
}

import { RabbitMqMessagingService } from '@core/infrastructure/messaging/rabbit-mq-messaging.service';

export const RABBITMQ_MESSAGING_SERVICE = 'RabbitMQMessagingService';

export const notificationProviders = [
  {
    provide: RABBITMQ_MESSAGING_SERVICE,
    useFactory: () =>
      new RabbitMqMessagingService(
        ['amqp://admin:admin@rabbit:5672'],
        'user-created',
      ),
  },
];

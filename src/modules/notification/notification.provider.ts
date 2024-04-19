import { RabbitMqMessagingService } from '@core/infrastructure/messaging/rabbit-mq-messaging.service';
import { ZohoMailService } from '@core/infrastructure/messaging/zoho-mail.service';

export const RABBITMQ_MESSAGING_SERVICE = 'RabbitMQMessagingService';
export const ZOHO_MAIL_SERVICE = 'ZohoMailService';

export const notificationProviders = [
  {
    provide: RABBITMQ_MESSAGING_SERVICE,
    useFactory: () =>
      new RabbitMqMessagingService(
        ['amqp://admin:admin@rabbit:5672'],
        'user-created',
      ),
  },
  {
    provide: ZOHO_MAIL_SERVICE,
    useFactory: () =>
      new ZohoMailService(
        process.env.ZOHO_HOST,
        Number(process.env.ZOHO_PORT),
        Boolean(process.env.ZOHO_SECURE) === true,
        process.env.ZOHO_USER,
        process.env.ZOHO_PASS,
      ),
  },
];

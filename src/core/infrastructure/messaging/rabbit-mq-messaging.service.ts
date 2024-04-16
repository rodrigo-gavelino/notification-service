import { IMessagingService } from '@core/shared/interfaces/messaging.interface';
import {
  AmqpConnectionManager,
  ChannelWrapper,
  connect,
} from 'amqp-connection-manager';

class RabbitMqMessagingService implements IMessagingService {
  private client: AmqpConnectionManager;
  private channel: ChannelWrapper;

  constructor(
    private urls: string[],
    private exchange: string,
  ) {
    this.client = connect(urls, {
      reconnectTimeInSeconds: 5,
      connectionOptions: {
        // Configurações de autenticação e outras configurações.
      },
    });

    this.channel = this.client.createChannel({
      json: true,
      setup: (channel) => this.setupChannel(channel),
    });
  }

  private async setupChannel(channel) {
    await channel.assertExchange(this.exchange, 'direct', { durable: true });

    await channel.assertQueue('UserCreatedEvent', { durable: true });

    await channel.bindQueue(
      'UserCreatedEvent',
      this.exchange,
      'UserCreatedEvent',
    );
  }

  async consume(
    queue: string,
    onMessage: (message: any) => Promise<void>,
  ): Promise<void> {
    try {
      await this.channel.addSetup(async (channel) => {
        await channel.assertQueue(queue, { durable: true });
        await channel.bindQueue(queue, this.exchange, queue);
        await channel.consume(queue, async (msg) => {
          if (msg !== null) {
            try {
              const messageContent = JSON.parse(msg.content.toString());
              await onMessage(messageContent);
              await channel.ack(msg);
            } catch (error) {
              console.error('Error handling message:', error);
              await channel.nack(msg);
            }
          }
        });
      });
    } catch (error) {
      console.error('Error setting up the consumer:', error);
    }
  }
}

export { RabbitMqMessagingService };

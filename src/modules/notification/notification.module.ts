import { Module } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { notificationProviders } from './notification.provider';

@Module({
  imports: [],
  controllers: [],
  providers: [NotificationService, ...notificationProviders],
})
export class NotificationModule {}

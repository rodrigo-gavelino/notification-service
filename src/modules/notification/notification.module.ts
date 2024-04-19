import { Module } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { notificationProviders } from './notification.provider';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ConfigService } from '@nestjs/config';
import { ZohoMailService } from '@core/infrastructure/messaging/zoho-mail.service';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const secret = configService.get<string>('JWT_SECRET');
        return {
          secret,
          signOptions: {
            expiresIn: configService.get<string | number>('JWT_EXPIRES'),
          },
        };
      },
    }),
  ],
  controllers: [],
  providers: [
    NotificationService,
    ...notificationProviders,
    ZohoMailService,
    JwtService,
  ],
  exports: [PassportModule],
})
export class NotificationModule {}

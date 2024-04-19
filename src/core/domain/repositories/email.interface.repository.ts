import INotificationServiceRepository from '@core/shared/domain/repositories/notification-service.interface.repository';
import EmailVerifyEntity from '../entities/email-verify.entity.ts';
import Email from '../value-objects/email.vo';

interface IEmailRepository
  extends INotificationServiceRepository<EmailVerifyEntity> {
  findByEmail(email: Email): Promise<EmailVerifyEntity | null>;
}

export default IEmailRepository;

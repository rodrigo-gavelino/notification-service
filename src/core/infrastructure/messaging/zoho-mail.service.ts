import { IMailService } from '@core/shared/interfaces/mail.service';
import { createTransport, Transporter } from 'nodemailer';

export class ZohoMailService implements IMailService {
  private readonly transporter: Transporter;
  private readonly maxRetries: number = 3; // Número máximo de tentativas de reenvio

  constructor(
  ) {

    this.transporter = createTransport({
      host: 'smtp.zoho.com',
      port: 465,
      secure: true,
      auth: {
        user: 'no.reply@appq.app',
        pass: 'W6nRv0sdMSC0',
      },
    });
  }

  async sendMail(to: string, subject: string, body: string): Promise<void> {
    let attempts = 0;

    while (attempts < this.maxRetries) {
      try {
        await this.transporter.sendMail({
          from: 'no.reply@appq.app',
          to: to,
          subject: subject,
          html: body,
        });
        console.log('Email sent successfully');
        return; // Se o email foi enviado com sucesso, saia da função
      } catch (error) {
        attempts++;
        console.error(`Attempt ${attempts} failed:`, error);
        if (attempts >= this.maxRetries) {
          console.error('Final attempt failed. Notifying administrator.');
          this.notifyAdmin(error, to, subject); // Notifica o administrador após a última tentativa falhar
          throw new Error(
            `All attempts to send email failed: ${error.message}`,
          );
        }
      }
    }
  }

  // Função para notificar o administrador sobre falhas persistentes no envio de email
  private notifyAdmin(error: any, to: string, subject: string) {
    // Implemente a lógica de notificação aqui, como enviar um email para o administrador ou registrar um alerta em um sistema de monitoramento
    console.log(
      `Admin notified: Error sending email to ${to} with subject "${subject}": ${error.message}`,
    );
  }
}

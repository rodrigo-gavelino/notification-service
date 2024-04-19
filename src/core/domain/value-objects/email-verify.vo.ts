import EmailTemplate from '@core/shared/abstracts/email-template.vo';

class EmailVerify extends EmailTemplate {
  private static readonly DEFAULT_SUBJECT = 'Verify Your Email Address';
  private static readonly DEFAULT_BODY = `<p>Thank you for registering with us. Please click the link below to verify your email address and activate your account.</p>
                                            <p><a href="{verificationLink}">Verify Email</a></p>`;

  private constructor(subject: string, body: string) {
    super(subject, body);
  }

  public static create(verificationLink: string): EmailVerify {
    const bodyWithLink = this.DEFAULT_BODY.replace(
      '{verificationLink}',
      verificationLink,
    );
    return new EmailVerify(this.DEFAULT_SUBJECT, bodyWithLink);
  }

  public equals(otherTemplate: EmailTemplate): boolean {
    return super.equals(otherTemplate);
  }
}

export default EmailVerify;

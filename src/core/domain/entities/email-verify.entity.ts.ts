import EmailTemplate from '@core/shared/abstracts/email-template.vo';
import Email from '../value-objects/email.vo';
import EmailVerify from '../value-objects/email-verify.vo';

type EmailVerifyConstructorProps = {
  _id?: string;
  email: Email;
  template: EmailVerify;
};

type EmailVerifyCommandProps = {
  _id?: string;
  email: Email;
  template: EmailVerify;
};

class EmailVerifyEntity {
  _id?: string;
  _email: Email;
  _template: EmailTemplate;

  private constructor(props: EmailVerifyConstructorProps) {
    this._id = props._id;
    this._email = props.email;
    this._template = props.template;
  }

  static create(props: EmailVerifyCommandProps): EmailVerifyEntity {
    return new EmailVerifyEntity(props);
  }

  equals(other: EmailVerifyEntity): boolean {
    return (
      this._email.equals(other._email) && this._template.equals(other._template)
    );
  }
}

export default EmailVerifyEntity;

import ValueObject from './value-object';

abstract class EmailTemplate extends ValueObject<{
  subject: string;
  body: string;
}> {
  protected constructor(subject: string, body: string) {
    super({
      subject,
      body,
    });
  }

  public equals(otherTemplate: EmailTemplate): boolean {
    return (
      this.value.body === otherTemplate.value.body &&
      this.value.subject === otherTemplate.value.subject
    );
  }
}

export default EmailTemplate;

import ValueObject from '@core/shared/abstracts/value-object';

class Email extends ValueObject<string> {
  private constructor(value: string) {
    super(value);
    this.validate();
  }
  public static create(value: string): Email {
    return new Email(value);
  }

  private validate() {
    if (!this.value.includes('@')) {
      throw new Error('Invalid email: Missing @ symbol');
    }
  }

  public equals(otherEmail: Email): boolean {
    return this._value === otherEmail.value;
  }
}

export default Email;

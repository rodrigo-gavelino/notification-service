import Email from "../value-objects/email.vo";


/**
 * UserCreatedEntity representa um domínio específico de usuário recém-criado que é relevante para o serviço de notificação.
 * Utiliza o Value Object Email para garantir a validade do e-mail.
 */
export class UserCreatedEntity {
    private readonly userId: string;
    private readonly email: Email;
    private readonly verificationToken: string;
    private readonly emailVerificationSended: boolean = false;

    constructor(userId: string, email: string, verificationToken: string) {
        this.userId = userId;
        this.email = Email.create(email);
        this.verificationToken = verificationToken;
        this.emailVerificationSended;
    }


    getUserId(): string {
        return this.userId;
    }


    getEmail(): string {
        return this.email.value;
    }


    getVerificationToken(): string {
        return this.verificationToken;
    }
}

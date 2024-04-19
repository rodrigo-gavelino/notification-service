import IUsecase from "@core/shared/application/usecase.interface";

export interface SendVerifyEmailInput {
    id: string,
    email: string,
}

export interface SendVerifyEmailOutput {
    message: string,
}

export interface ISendVerifyEmailUsecase extends IUsecase<SendVerifyEmailInput, SendVerifyEmailOutput> {
    execute(input: SendVerifyEmailInput): Promise<SendVerifyEmailOutput>;

}
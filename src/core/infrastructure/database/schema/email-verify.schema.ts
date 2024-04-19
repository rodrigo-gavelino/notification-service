import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type EmailVerifyDocument = EmailVerifyMongooseSchema & Document;

@Schema({
  timestamps: true,
  collection: 'email_verify',
})
export class EmailVerifyMongooseSchema {
  @Prop({ required: true, type: String })
  email: string;

  @Prop({ required: true, type: String })
  token: string;

  @Prop({ required: true, type: String })
  link: string;

  @Prop({ required: true, type: Date })
  expiresAt: Date;
}

export const EmailVerifyMongooseModel = SchemaFactory.createForClass(
  EmailVerifyMongooseSchema,
);

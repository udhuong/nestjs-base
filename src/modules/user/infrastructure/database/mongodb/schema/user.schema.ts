import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = UserModel & Document;

@Schema()
export class UserModel {
  @Prop({ required: true })
  name: string;

  @Prop({ unique: true, required: true })
  email: string;
}

export const UserSchemaName = 'User';
export const UserSchema = SchemaFactory.createForClass(UserModel);

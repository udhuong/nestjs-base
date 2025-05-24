import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = UserModel & Document;

@Schema({ collection: 'users' })
export class UserModel extends Document {
  @Prop({ type: Number, unique: true })
  user_id: number;

  @Prop({ required: true })
  name: string;

  @Prop({ unique: true })
  username: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop()
  phone: string;

  @Prop({ required: true })
  password: string;

  @Prop({ type: Number, default: 0 })
  status: number;

  @Prop({ type: Date, default: Date.now })
  created: Date;

  @Prop({ type: Date, default: Date.now })
  modified: Date;
}

export const UserSchema = SchemaFactory.createForClass(UserModel);

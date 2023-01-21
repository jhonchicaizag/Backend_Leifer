import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema({ timestamps: true })
export class User {
  @Prop({ required: true, unique: true })
  email: string;

  @Prop()
  password: string;

  @Prop({
    default: ['user'],
  })
  rol: string[];

  @Prop()
  avatar: string;

  @Prop()
  description: string;
}

export const UserSchema = SchemaFactory.createForClass(User);

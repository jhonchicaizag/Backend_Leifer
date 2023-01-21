import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import mongoose, { HydratedDocument } from 'mongoose';

export type AwardDocument = HydratedDocument<Award>;

@Schema({ timestamps: true })
export class Award {
  @Prop({ required: true, unique: true })
  title: string;

  @Prop()
  idCourse: mongoose.Types.ObjectId;

  @Prop()
  description: number;

  @Prop()
  source: string;

  @Prop()
  score: string;
}

export const CourseSchema = SchemaFactory.createForClass(Award);

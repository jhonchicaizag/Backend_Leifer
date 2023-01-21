import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import mongoose, { HydratedDocument } from 'mongoose';

export type VideosDocument = HydratedDocument<Videos>;

@Schema({ timestamps: true })
export class Videos {
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

export const CourseSchema = SchemaFactory.createForClass(Videos);

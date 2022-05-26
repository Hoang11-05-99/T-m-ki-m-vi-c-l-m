import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types, Schema as MongooseSchema } from 'mongoose';
import { Sex } from 'src/constant/enum';

export type ProfileDocument = Profile & Document;

@Schema()
export class Profile {
  @Prop({ type: String, required: true })
  name: string;

  @Prop({
    type: String,
    required: true,
  })
  birthday: string;

  @Prop({
    type: String,
  })
  phone: string;

  @Prop({
    type: String,
    required: true,
  })
  email: string;

  @Prop({
    type: String,
    required: true,
  })
  imgUrl: string;

  @Prop({
    type: String,
    required: true,
  })
  degree: string;

  @Prop({
    type: String,
    required: true,
  })
  experience: string;

  @Prop({
    type: String,
    required: true,
  })
  skill: string;

  @Prop({
    type: String,
    required: true,
  })
  hobby: string;

  @Prop({
    type: String,
    required: true,
  })
  target: string;

  @Prop({
    required: true,
    type: String,
    enum: Sex,
  })
  gender: string;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Account' })
  account: Types.ObjectId;

  @Prop({ default: Date.now })
  createdAt: Date;

  @Prop({ default: Date.now })
  updateAt: Date;
}

export const ProfileSchema = SchemaFactory.createForClass(Profile);

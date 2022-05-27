import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types, Schema as MongooseSchema } from 'mongoose';
import { Marry, Rank, Salary, Sex, Type, WorkingForm } from 'src/constant/enum';

export type ProfileDocument = Profile & Document;

@Schema()
export class Profile {
  @Prop({ type: String, required: true })
  name: string;

  @Prop({ type: String, required: true })
  address: string;

  @Prop({ type: String, required: true })
  firstDay: string;

  @Prop({ type: String, required: true })
  endDay: string;

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
  schoolName: string;

  @Prop({
    type: String,
    required: true,
    enum: Type,
  })
  branch: string;

  @Prop({
    type: String,
    required: true,
  })
  language: string;

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
  target: string;

  @Prop({
    required: true,
    type: String,
    enum: Sex,
  })
  gender: string;

  @Prop({
    required: true,
    type: String,
    enum: Marry,
  })
  marry: string;

  @Prop({
    required: true,
    type: String,
    enum: Salary,
  })
  salary: string;

  @Prop({
    required: true,
    type: String,
    enum: Rank,
  })
  rank: string;

  @Prop({
    required: true,
    type: String,
    enum: WorkingForm,
  })
  workForm: string;

  @Prop({
    required: true,
    type: String,
    enum: Type,
  })
  branchWant: string;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Account' })
  account: Types.ObjectId;

  @Prop({ default: Date.now })
  createdAt: Date;

  @Prop({ default: Date.now })
  updateAt: Date;
}

export const ProfileSchema = SchemaFactory.createForClass(Profile);

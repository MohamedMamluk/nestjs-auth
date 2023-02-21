import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
//exported the type of user document to be used as the base type of the Model from mongoose
export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop({ required: true })
  name: string;
  @Prop({ required: true, unique: true })
  email: string;
  @Prop({ required: true, minlength: 6 })
  password: string;
  @Prop({ required: true })
  phone: string;
  @Prop({ required: true })
  address: string;
  @Prop({ default: [] })
  addressBook: { name: string; address: string }[];
}

export const UserSchema = SchemaFactory.createForClass(User);

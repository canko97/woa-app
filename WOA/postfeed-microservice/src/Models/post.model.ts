import { getModelForClass, prop, Ref } from '@typegoose/typegoose';
import { ObjectId } from 'mongoose';

export class Post {
  @prop({ required: true })
  user: string;

  @prop({ required: true })
  username: string;

  @prop({ required: true })
  content: string;
}

const PostModel = getModelForClass(Post, {
  schemaOptions: {
    timestamps: true,
  },
});

export default PostModel;

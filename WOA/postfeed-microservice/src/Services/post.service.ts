import { DocumentType } from '@typegoose/typegoose';
import { BeAnObject } from '@typegoose/typegoose/lib/types';
import PostModel, { Post } from '../Models/post.model';
import { FilterQuery, QueryOptions, UpdateQuery } from 'mongoose';

export async function createPost(
  userId: string,
  username: string,
  content: string
) {
  return PostModel.create({
    user: userId,
    username: username,
    content: content,
  });
}

export async function getUserPosts(userId: string) {
  return PostModel.find({ user: userId });
}

export async function getAllPosts() {
  return PostModel.find({});
}

export async function updatePost(
  query: FilterQuery<DocumentType<Post, BeAnObject>> | undefined,
  update: UpdateQuery<DocumentType<Post, BeAnObject>> | undefined,
  options: QueryOptions
) {
  return PostModel.findOneAndUpdate(query, update, options);
}

export async function findPost(query: FilterQuery<Post>) {
  return PostModel.findOne(query);
}

export async function deletePost(
  query: FilterQuery<DocumentType<Post, BeAnObject>> | undefined
) {
  return PostModel.deleteOne(query);
}

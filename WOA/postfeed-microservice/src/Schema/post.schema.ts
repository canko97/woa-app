import { TypeOf, object, string } from 'zod';

const body = {
  body: object({
    content: string({
      required_error: 'Posts must have a content',
    }),
  }),
};

const params = {
  params: object({
    postId: string({ required_error: 'PostId is required' }),
  }),
};

export const createPostSchema = object({
  ...body,
});

export const getPostSchema = object({
  ...params,
});

export const updatePostSchema = object({
  ...body,
  ...params,
});

export const deletePostSchema = object({
  ...params,
});

export type CreatePostInput = TypeOf<typeof createPostSchema>;
export type GetPostInput = TypeOf<typeof getPostSchema>;
export type UpdatePostInput = TypeOf<typeof updatePostSchema>;
export type DeletePostInput = TypeOf<typeof deletePostSchema>;

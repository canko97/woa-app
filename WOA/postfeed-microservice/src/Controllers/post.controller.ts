import {
  createPost,
  deletePost,
  findPost,
  getAllPosts,
  updatePost,
} from '../Services/post.service';
import { CreatePostInput, UpdatePostInput } from '../Schema/post.schema';
import { Request, Response } from 'express';

export async function createPostHandler(
  req: Request<{}, {}, CreatePostInput['body']>,
  res: Response
) {
  const userId = res.locals.user._id;

  const username = `${res.locals.user.firstName} ${res.locals.user.lastName}`;

  const { content } = req.body;

  try {
    const newNote = await createPost(userId, username, content);
    return res.status(200).send(newNote);
  } catch (error: any) {
    return res
      .status(500)
      .send({ error: 'Error while creating post', message: error.message });
  }
}

export async function getPostsHandler(req: Request<{}, {}, {}>, res: Response) {
  try {
    const posts = await getAllPosts();

    //Reversed so that the latest appear first
    const reversedPosts = posts?.slice().reverse();

    return res.status(200).json(reversedPosts);
  } catch (error: any) {
    return res
      .status(500)
      .send({ error: 'Error while getting posts', message: error.message });
  }
}

export async function updatePostHandler(
  req: Request<UpdatePostInput['params']>,
  res: Response
) {
  try {
    const userId = res.locals.user._id;

    const postId = req.params.postId;

    const update = req.body;

    const post = await findPost({ _id: postId });

    if (!post) {
      return res.status(404);
    }

    if (String(post.user) !== userId) {
      return res.sendStatus(403);
    }

    const updatedPost = await updatePost({ postId }, update, {
      new: true,
    });

    return res.send(updatedPost);
  } catch (error) {}
}

export async function deletePostHandler(
  req: Request<UpdatePostInput['params']>,
  res: Response
) {
  const userId = res.locals.user._id;
  const postId = req.params.postId;

  const post = await findPost({ postId });

  if (!post) {
    return res.status(404);
  }

  if (String(post.user) !== userId) {
    return res.sendStatus(403);
  }

  await deletePost({ postId });

  return res.sendStatus(200);
}

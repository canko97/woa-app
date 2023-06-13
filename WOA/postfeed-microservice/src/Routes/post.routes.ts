import express from 'express';
import {
  createPostHandler,
  deletePostHandler,
  getPostsHandler,
  updatePostHandler,
} from '../Controllers/post.controller';
import requireUser from '../Middleware/requireUser';

const router = express.Router();

router.post('/api/notes/create', requireUser, createPostHandler);
router.get('/api/notes/get', requireUser, getPostsHandler);
router.patch('/api/notes/update', requireUser, updatePostHandler);
router.delete('/api/notes/delete', requireUser, deletePostHandler);

export default router;

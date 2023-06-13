import express from 'express';
import {
  createSessionHandler,
  deleteSessionHandler,
  googleOauthHandler,
  keepSessionAliveHandler,
} from '../Controllers/auth.controller';
import validateResource from '../Middleware/validateResource';
import { createSessionSchema } from '../Schema/auth.schema';
import requireUser from '../Middleware/requireUser';

const router = express.Router();

router.post(
  '/api/auth/sessions/create',
  validateResource(createSessionSchema),
  createSessionHandler
);

router.delete('/api/auth/sessions/delete', requireUser, deleteSessionHandler);

router.get(
  '/api/auth/sessions/keep-alive',
  requireUser,
  keepSessionAliveHandler
);

router.get('/api/auth/sessions/oauth/google', googleOauthHandler);

export default router;

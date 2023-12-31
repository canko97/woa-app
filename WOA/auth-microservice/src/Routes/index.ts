import express from 'express';
import user from './user.routes';
import auth from './auth.routes';

const router = express.Router();
router.use(user);
router.use(auth);

router.get('/api/auth/healthcheck', (_, res) => res.sendStatus(200));

export default router;

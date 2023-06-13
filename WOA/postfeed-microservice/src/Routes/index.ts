import express from 'express';
import post from './post.routes';

const router = express.Router();
router.use(post);

router.get('/api/notes/healthcheck', (_, res) => res.sendStatus(200));

export default router;

import express from 'express';
import {
  createUserHandler,
  forgotPasswordHandler,
  getAllUsersHandler,
  getCurrentUserHandler,
  getUserNameHandler,
  resetPasswordHandler,
  verifyUserHandler,
  deleteAccountHandler,
} from '../Controllers/user.controller';
import validateResource from '../Middleware/validateResource';
import requireUser from '../Middleware/requireUser';
import { authorizeAdmin, authorizeUser } from '../Middleware/authorization';
import {
  createUserSchema,
  verifyUserSchema,
  forgotPasswordSchema,
  resetPasswordSchema,
  getUserNameSchema,
} from '../Schema/user.schema';

const router = express.Router();

router.get(
  '/api/auth/users/get',
  requireUser,
  authorizeUser,
  authorizeAdmin,
  getAllUsersHandler
);

router.post(
  '/api/auth/users/create',
  validateResource(createUserSchema),
  createUserHandler
);

router.delete(
  '/api/auth/users/delete',
  requireUser,
  authorizeUser,
  deleteAccountHandler
);

router.post(
  '/api/auth/users/verify/:id/:verificationCode',
  validateResource(verifyUserSchema),
  verifyUserHandler
);

router.post(
  '/api/auth/users/forgotpassword',
  validateResource(forgotPasswordSchema),
  forgotPasswordHandler
);

router.post(
  '/api/auth/users/resetpassword/:id/:passwordResetCode',
  validateResource(resetPasswordSchema),
  resetPasswordHandler
);

router.get(
  '/api/auth/users/get/me',
  requireUser,
  authorizeUser,
  getCurrentUserHandler
);

router.get(
  '/api/auth/users/get/:id',
  validateResource(getUserNameSchema),
  getUserNameHandler
);

export default router;

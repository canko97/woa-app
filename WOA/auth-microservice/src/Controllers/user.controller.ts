import { Request, Response, text } from 'express';
import {
  CreateUserInput,
  VerifyUserInput,
  ForgotPasswordInput,
  ResetPasswordInput,
  GetUserNameInput,
} from '../Schema/user.schema';
import { privateFields, User } from '../Models/user.model';
import {
  createUser,
  findUserByEmail,
  findUserById,
  findAllUsers,
} from '../Services/user.service';
// import log from '../utils/logger';
import { nanoid } from 'nanoid';
import sendRabbitMQ from '../Utils/rabbitMQ';
import { getValidSessions } from '../Services/auth.service';
import { omit } from 'lodash';
import { FlattenMaps, LeanDocument } from 'mongoose';

export async function createUserHandler(
  req: Request<{}, {}, CreateUserInput>,
  res: Response
) {
  const body = req.body;

  try {
    const user = await createUser(body);

    const queue = 'userCreated';
    const emailData = {
      from: 'cankonedelchev@gmail.com',
      to: user.email,
      subject: 'Please verify your account',
      text: `http://woaapp.com/verify-email?verificationCode=${user.verificationCode}&id=${user.id}`,
    };
    sendRabbitMQ(queue, JSON.stringify(emailData));

    return res.send('User successfully created');
  } catch (e: any) {
    if (e.code === 11000) {
      return res.status(409).send('Account already exists');
    }

    return res.status(500).send(e);
  }
}

export async function verifyUserHandler(
  req: Request<VerifyUserInput>,
  res: Response
) {
  try {
    const id = req.params.id;
    const verificationCode = req.params.verificationCode;

    // find the user by id
    const user = await findUserById(id);

    if (!user) {
      return res.send('Could not verify user');
    }

    //check to see if they are already verified
    if (user.verified) {
      return res.send('User is already verified');
    }

    //check to see if the verificationCode matches
    if (user.verificationCode === verificationCode) {
      user.verified = true;

      await user.save();

      return res.send('User successfully verified');
    }

    return res.send('Could not verify user');
  } catch (error: any) {
    console.log(error.message);
  }
}

export async function forgotPasswordHandler(
  req: Request<{}, {}, ForgotPasswordInput>,
  res: Response
) {
  try {
    const message =
      'If a user with that email is registered you will receive a password reset email';

    const { email } = req.body;

    const user = await findUserByEmail(email);

    if (!user) {
      return res.send(message);
    }

    if (!user.verified) {
      return res.send('User is not verified');
    }

    const passwordResetCode = nanoid();

    user.passwordResetCode = passwordResetCode;

    await user.save();

    // await sendEmail({
    //   to: user.email,
    //   from: 'test@example.com',
    //   subject: 'Reset your password',
    //   text: `http://localhost:3000/verify-email?verificationCode=${passwordResetCode}&id=${user.id}`,
    // });

    return res.send(message);
  } catch (error: any) {
    console.log(error.message);
  }
}

export async function resetPasswordHandler(
  req: Request<ResetPasswordInput['params'], {}, ResetPasswordInput['body']>,
  res: Response
) {
  const { id, passwordResetCode } = req.params;

  const { password } = req.body;

  const user = await findUserById(id);

  if (
    !user ||
    !user.passwordResetCode ||
    user.passwordResetCode !== passwordResetCode
  ) {
    return res.status(400).send('Could not reset user password');
  }

  user.passwordResetCode = null;

  user.password = password;

  await user.save();

  return res.send('Successfully updated password');
}

export async function getUserNameHandler(
  req: Request<GetUserNameInput, {}, {}>,
  res: Response
) {
  const { id } = req.params;
  const user = await findUserById(id);
  if (!user) {
    return res.status(404);
  }

  const username = `${user.firstName} ${user.lastName}`;

  return res.status(200).json(username);
}

export async function getOnlineUsers(req: Request, res: Response) {
  const sessions = await getValidSessions();
  const onlineUsers: Array<any> = [];

  for (const session of sessions) {
    if (!session.user) {
      return;
    }
    const user = await findUserById(session.user.toString());
    if (user) {
      onlineUsers.push(omit(user.toJSON(), privateFields));
    }
  }

  return res.status(200).send(onlineUsers);
}

export async function getCurrentUserHandler(req: Request, res: Response) {
  return res.send(res.locals.user);
}

export async function getAllUsersHandler(req: Request, res: Response) {
  const users = await findAllUsers();
  const sanitizedUsers: Partial<FlattenMaps<LeanDocument<User>>>[] = [];

  users.forEach((user) => {
    const omitedUser = omit(user.toJSON(), privateFields);
    sanitizedUsers.push(omitedUser);
  });

  return res.json(sanitizedUsers);
}

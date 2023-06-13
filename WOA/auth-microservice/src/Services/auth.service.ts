import { DocumentType } from '@typegoose/typegoose';
import { omit } from 'lodash';
import SessionModel, { Session } from '../Models/session.model';
import { privateFields, User } from '../Models/user.model';
import { signJwt, verifyJwt } from '../Utils/jwt';
import { findUserById } from './user.service';
import { FilterQuery, UpdateQuery } from 'mongoose';

export async function createSession(userId: string, userAgent: string) {
  return SessionModel.create({ user: userId, userAgent: userAgent });
}

export async function findSessionById(id: string) {
  return SessionModel.findById(id);
}

export async function getValidSessions() {
  return SessionModel.find({ valid: true });
}

export async function findUserSessions(user: any, valid: any) {
  return SessionModel.findOne({ user, valid });
}

export async function signRefreshToken(sessionId: string) {
  const refreshToken = signJwt(
    {
      session: sessionId,
    },
    'refreshTokenPrivateKey',
    {
      expiresIn: '1y',
    }
  );

  return refreshToken;
}

export async function updateSession(
  query: FilterQuery<Session>,
  update: UpdateQuery<Session>
) {
  return SessionModel.updateOne(query, update);
}

export function signAccessToken(user: DocumentType<User>, session: string) {
  const privateUser = omit(user.toJSON(), privateFields);

  const payload = { ...privateUser, session };

  const accessToken = signJwt(payload, 'accessTokenPrivateKey', {
    expiresIn: '10m',
  });

  return accessToken;
}

export async function reIssueAccessToken(refreshToken: string) {
  const decoded = verifyJwt<{ session: string }>(
    refreshToken,
    'refreshTokenPublicKey'
  );

  if (!decoded) {
    return;
  }

  const session = await findSessionById(decoded.session);

  if (!session || !session.valid) {
    return;
  }

  const user = await findUserById(String(session.user));

  if (!user) {
    return;
  }

  const accessToken = signAccessToken(user, session._id);

  return accessToken;
}

export async function handleTimedOutSession(refreshToken: string) {
  try {
    const decoded = verifyJwt<{ session: string }>(
      refreshToken,
      'refreshTokenPublicKey'
    );

    if (!decoded) {
      return;
    }

    await updateSession({ _id: decoded.session }, { valid: false });

    return null;
  } catch (error: any) {
    console.error(error.message);
    return null;
  }
}

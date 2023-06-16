import { CookieOptions, Request, Response } from 'express';
import { CreateSessionInput } from '../Schema/auth.schema';
import config from 'config';
import {
  signAccessToken,
  signRefreshToken,
  findUserSessions,
  updateSession,
  createSession,
} from '../Services/auth.service';
import {
  findAndUpdateUser,
  findUserByEmail,
  getGoogleOAuthTokens,
  getGoogleUser,
} from '../Services/user.service';

const accessTokenCookieOptions = <CookieOptions>{
  maxAge: 1000000, // 15 min
  httpOnly: true,
  sameSite: 'strict',
};

const refreshTokenCookieOptions = <CookieOptions>{
  ...accessTokenCookieOptions,
  maxAge: 3.154e10, // 1 year
};

export async function createSessionHandler(
  req: Request<{}, {}, CreateSessionInput>,
  res: Response
) {
  const message = 'Invalid email or password';
  const { email, password } = req.body;

  const user = await findUserByEmail(email);

  if (!user) {
    return res.send(message);
  }

  if (!user.verified) {
    return res.send('Please verify your email');
  }

  const isValid = await user.validatePassword(password);

  if (!isValid) {
    return res.send(message);
  }

  const session = await createSession(user._id, req.get('user-agent') || '');

  // sign a access token
  const accessToken = signAccessToken(user, session._id);

  // sign a refresh token
  const refreshToken = await signRefreshToken(session._id);

  // send the tokens

  res.cookie('accessToken', accessToken, accessTokenCookieOptions);

  res.cookie('refreshToken', refreshToken, refreshTokenCookieOptions);

  return res.send({
    accessToken,
    refreshToken,
  });
}

export async function googleOauthHandler(req: Request, res: Response) {
  // get the code from query string
  const code = req.query.code as string;
  try {
    // get the id and access token from the code
    const { id_token, access_token } = await getGoogleOAuthTokens({ code });

    // get user with tokens
    const googleUser = await getGoogleUser({ id_token, access_token });

    const [firstName, lastName] = googleUser.name.split(' ');

    if (!googleUser.verified_email) {
      return res.status(403).send('Please verify your email first');
    }

    // upsert the user

    const user = await findAndUpdateUser(
      {
        email: googleUser.email,
      },
      {
        email: googleUser.email,
        firstName: firstName,
        lastName: lastName,
        picture: googleUser.picture,
        verified: true,
      },
      {
        upsert: true,
        new: true,
      }
    ); // Need to make sure that the email verified (leaving it to Google to check)

    // check if user is found
    if (!user) {
      throw new Error('User not found');
    }

    const session = await createSession(user._id, req.get('user-agent') || '');

    // sign a access token
    const accessToken = signAccessToken(user, session._id); // TTL token = 10m

    // sign a refresh token and create a session
    const refreshToken = await signRefreshToken(
      session._id // TTL token = 1 year
    );

    // set cookies
    res.cookie('accessToken', accessToken, accessTokenCookieOptions);

    res.cookie('refreshToken', refreshToken, refreshTokenCookieOptions);

    // redirect back to client
    res.redirect(`${config.get('origin')}`);
  } catch (error: any) {
    console.error(error.response);
    return res.redirect(`${config.get('origin')}/oauth/error`);
  }
}

export async function getUserSessionsHandler(req: Request, res: Response) {
  const userId = res.locals.user._id;

  const sessions = await findUserSessions(userId, true);

  return res.send(sessions);
}

export async function keepSessionAliveHandler(req: Request, res: Response) {
  res.status(200).json({ message: 'Keep-alive request received' });
}

export async function deleteSessionHandler(req: Request, res: Response) {
  const sessionId = res.locals.user.session;

  await updateSession({ _id: sessionId }, { valid: false });

  res.clearCookie('accessToken');
  res.clearCookie('refreshToken');

  return res.send({
    accessToken: null,
    refreshToken: null,
  });
}

import { Request, Response, NextFunction } from 'express';
import { verifyJwt } from '../Utils/jwt';
import { get } from 'lodash';
import {
  handleTimedOutSession,
  reIssueAccessToken,
} from '../Services/auth.service';

const deserializeUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const accessToken =
    get(req, 'cookies.accessToken') ||
    get(req, 'headers.authorization', '').replace(/^Bearer\s/, '');

  const refreshToken =
    get(req, 'cookies.refreshToken') || get(req, 'headers.x-refresh');

  if (!accessToken && !refreshToken) {
    return next();
  }

  // if the access token cookie has expired then invalidate the session
  if (!accessToken && refreshToken) {
    await handleTimedOutSession(refreshToken);
    return next();
  }

  const decoded = verifyJwt(accessToken, 'accessTokenPublicKey');

  if (decoded) {
    res.locals.user = decoded;
    return next();
  } else if (refreshToken) {
    try {
      const newAccessToken = await reIssueAccessToken(refreshToken);

      if (newAccessToken) {
        res.setHeader('x-access-token', newAccessToken);

        res.cookie('accessToken', newAccessToken, {
          maxAge: 86400000, // 1 day
          httpOnly: true,
          sameSite: 'strict',
        });

        const decoded = verifyJwt(newAccessToken, 'accessTokenPublicKey');
        res.locals.user = decoded;
        return next();
      }
    } catch (error: any) {
      console.error('Error reissuing access token:', error.message);
      return res.status(401).send('Unauthorized');
    }
  }
  return next();
};

export default deserializeUser;

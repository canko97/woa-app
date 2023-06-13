import { Request, Response, NextFunction } from 'express';
import { verifyJwt } from '../Utils/jwt';
import { get } from 'lodash';

const extractUser = async (req: Request, res: Response, next: NextFunction) => {
  const accessToken =
    get(req, 'cookies.accessToken') ||
    get(req, 'headers.authorization', '').replace(/^Bearer\s/, '');

  if (!accessToken) {
    return next();
  }

  try {
    const decoded = verifyJwt(accessToken, 'accessTokenPublicKey');

    if (decoded) {
      res.locals.user = decoded;
      return next();
    }
  } catch (error: any) {
    console.error('Error verifying access token:', error.message);
    return res.status(401).send('Unauthorized');
  }

  next();
};

export default extractUser;

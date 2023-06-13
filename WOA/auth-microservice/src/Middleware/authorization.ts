import { Request, Response, NextFunction } from 'express';

export const authorizeUser = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const user = res.locals.user;

  if (!user.role) {
    return res.sendStatus(401);
  }

  const roles = user.role;
  if (!roles.includes('USER')) {
    return res.sendStatus(401);
  }

  return next();
};

export const authorizeAdmin = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const user = res.locals.user;

  if (!user.role) {
    return res.sendStatus(401);
  }

  const roles = user.role;
  if (!roles.includes('ADMIN')) {
    return res.sendStatus(401);
  }

  return next();
};

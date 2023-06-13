import { restResponseTimeHistogram } from '../Utils/metrics';
import { Request, Response, NextFunction } from 'express';

const restResponseTime = (req: Request, res: Response, time: number) => {
  if (req?.route?.path) {
    restResponseTimeHistogram.observe(
      {
        method: req.method,
        route: req.route.path,
        status_code: res.statusCode,
      },
      time * 1000 //convert to seconds
    );
  }
};

export default restResponseTime;

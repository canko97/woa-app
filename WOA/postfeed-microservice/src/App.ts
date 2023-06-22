import express, { Application } from 'express';
import compression from 'compression';
import morgan from 'morgan';
import helmet from 'helmet';
import cors from 'cors';
import connectToDb from './Utils/connectToDb';
import log from './Utils/logger';
import router from './Routes';
import cookieParser from 'cookie-parser';
import { AllowedOrigins } from './Utils/corsOrigins';
import { Server } from 'http';
import extractUser from './Middleware/extractUser';
import config from 'config';
// import startSubscriber from './Utils/consumer';

export class App {
  private express: Application;
  private port: number;
  private version: string;

  constructor(port: number, version: string) {
    this.express = express();
    this.port = port || 80;
    this.version = version || '1.0';

    this.initializeMiddleware();
    // this.StartSubscriber();
  }

  private initializeMiddleware(): void {
    this.express.use(helmet());
    this.express.use(morgan('dev'));
    this.express.use(cors(this.corsOptions));
    this.express.use(cookieParser());
    this.express.use(express.json());
    this.express.use(extractUser);
    this.express.use(router);
    this.express.use(express.urlencoded({ extended: false }));
    this.express.use(compression());
  }

  // async StartSubscriber() {
  //   await startSubscriber();
  // }

  corsOptions: cors.CorsOptions = {
    origin: function (origin, callback) {
      //  If the origin is undefined, the request was sent by itself
      // Allowed origins get checked by array of regex above
      if (!origin || AllowedOrigins.some((rx: any) => rx.test(origin))) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },

    methods: ['GET', 'POST', 'OPTIONS', 'PATCH', 'DELETE'],
    allowedHeaders: ['Authorization', 'Content-Type'],
    credentials: true,
    preflightContinue: true,
  };

  public listen(): Server {
    const app = this.express.listen(this.port, async () => {
      log.info(`App started at http://localhost:${this.port}`);
      log.info(config.get('origin'));
      connectToDb();
      log.info(`API v${this.version}`);
    });

    return app;
  }
}

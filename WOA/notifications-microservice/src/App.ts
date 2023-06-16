import express, { Application } from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import compresson from 'compression';
import { Server } from 'http';
import { startRabbitMQConsumer } from './Utils/rabbitmq-consumer'; // assuming the file with the RabbitMQ consumer code is called 'rabbitmq-consumer.ts'
import config from 'config';

export class App {
  public express: Application;
  public port: number;
  constructor(port: number) {
    this.express = express();
    this.port = port || 80;

    this.initializeMiddleware();
    this.startRabbitMQ();
  }

  private startRabbitMQ(): void {
    try {
      startRabbitMQConsumer();
    } catch (error: any) {
      console.error(error.message);
    }
  }

  private initializeMiddleware(): void {
    this.express.use(express.json());
    this.express.use(helmet());
    this.express.use(morgan('dev'));
    this.express.use(compresson());
    this.express.use(express.urlencoded({ extended: false }));
  }

  public listen(): Server {
    const app = this.express.listen(this.port, async () => {
      console.info(`App started at http://localhost:${this.port}`);
      console.info(config.get('messaging.rabbitMQ.connectionString'));

      // connectToDb();
    });

    return app;
  }
}

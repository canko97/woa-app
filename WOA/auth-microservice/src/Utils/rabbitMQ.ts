import amqp, { Channel, Connection } from 'amqplib/callback_api';
import config from 'config';

const rabbitUrl: string = config.get('messaging.rabbitMQ.connectionString');

const sendRabbitMQ = function sendRabbitMQ(queueName: string, data: any): void {
  amqp.connect(
    rabbitUrl,
    function (error0: Error | null, connection: Connection) {
      if (error0) {
        throw error0;
      }
      connection.createChannel(function (
        error1: Error | null,
        channel: Channel
      ) {
        if (error1) {
          throw error1;
        }

        const queue = queueName;

        channel.assertQueue(queue, {
          durable: false,
        });
        channel.sendToQueue(queue, Buffer.from(data));

        console.log(' [x] Sent %s', data);
      });
      setTimeout(function () {
        connection.close();
      }, 500);
    }
  );
};
export default sendRabbitMQ;

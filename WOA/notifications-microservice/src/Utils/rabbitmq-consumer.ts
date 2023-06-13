import amqp from 'amqplib/callback_api';
import config from 'config';
import sendEmail from './mailer';

const rabbitUrl: string = config.get('messaging.rabbitMQ.connectionString');

function startRabbitMQConsumer() {
  function connectToRabbitMQ() {
    amqp.connect(rabbitUrl, function (error0, connection) {
      if (error0) {
        console.error('Failed to connect to RabbitMQ:', error0.message);
        console.log('Retrying connection in 5 seconds...');
        setTimeout(connectToRabbitMQ, 5000); // Retry connection after 5 seconds
        return;
      }

      connection.createChannel(function (error1, channel) {
        if (error1) {
          console.error('Failed to create channel:', error1.message);
          connection.close();
          return;
        }

        const queue = 'userCreated';

        channel.assertQueue(queue, {
          durable: false,
        });

        console.log(
          ' [*] Waiting for user mail info messages in %s. To exit, press CTRL+C',
          queue
        );

        channel.consume(
          queue,
          function (data) {
            if (!data) {
              return;
            }
            const mailInfo = JSON.parse(data.content.toString());
            console.log(' [x] Received mail info:', mailInfo);
            sendEmail(mailInfo);
          },
          {
            noAck: true,
          }
        );
      });

      connection.on('close', function () {
        console.error('Connection to RabbitMQ closed unexpectedly.');
        console.log('Retrying connection in 5 seconds...');
        setTimeout(connectToRabbitMQ, 5000); // Retry connection after 5 seconds
      });
    });
  }

  connectToRabbitMQ();
}

export { startRabbitMQConsumer };

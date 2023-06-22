import { PubSub, Message } from '@google-cloud/pubsub';
import { v4 as uuidv4 } from 'uuid';

// class PubSubManager {
//   private static instance: PubSubManager;
//   private pubSubClient = new PubSub();

//   private constructor() {}

//   private async initialise() {
//     const subscriptionName = 'sub-' + uuidv4();
//     await this.pubSubClient
//       .topic('accountDeleted')
//       .createSubscription(subscriptionName);

//     const subscription = this.pubSubClient.subscription(subscriptionName);

//     const handleMessage = (message: Message) => {
//       // Parse event data and fabricate event
//       const messageData = JSON.parse(message.data.toString('ascii'));
//       console.log(messageData);
//       // "Ack" (acknowledge receipt of) the message
//       message.ack();
//     };

//     // Listen for new messages
//     subscription.on('message', handleMessage);
//   }

//   public static getInstance(): PubSubManager {
//     if (!PubSubManager.instance) {
//       PubSubManager.instance = new PubSubManager();
//       PubSubManager.instance.initialise();
//     }

//     return PubSubManager.instance;
//   }

//   public emit(message: string) {
//     const dataBuffer = Buffer.from(JSON.stringify(message));

//     this.pubSubClient
//       .topic('accountDeleted')
//       .publish(dataBuffer)
//       .then((messageId: string) => {
//         console.log(`Pushed event message with id: ${messageId}`);
//       })

//       .catch((err: unknown) => {
//         const error = err as Error;
//         console.error(error.message);
//       });
//   }
// }

////////////////////////////////////////////////////////////////
class PubSubHandler {
  private pubsub: PubSub;
  private topicName: string;
  private subscriptionName: string;
  private subscription: any;

  constructor() {
    try {
      this.pubsub = new PubSub({
        keyFilename: './keyfile.json', // Path to your service account key file
      });
    } catch (error) {
      console.error('Failed to initialize PubSub:', error);
    }
    this.topicName = 'deleteAccount';
    this.subscriptionName = `postfeed-${uuidv4()}`;
    this.subscription = null;
  }

  async createTopic(): Promise<void> {
    try {
      const [topic] = await this.pubsub.createTopic(this.topicName);
      console.log(`Topic ${topic.name} created.`);
    } catch (error) {
      console.error('Failed to create topic:', error);
    }
  }

  async createSubscription(): Promise<void> {
    try {
      const [subscription] = await this.pubsub
        .topic(this.topicName)
        .createSubscription(this.subscriptionName);
      console.log(`Subscription ${subscription.name} created.`);
    } catch (error) {
      console.error('Failed to create subscription:', error);
    }
  }

  async publishMessage(data: string): Promise<void> {
    try {
      const dataBuffer = Buffer.from(data);
      await this.pubsub.topic(this.topicName).publish(dataBuffer);
      console.log(`Message published.`);
    } catch (error) {
      console.error('Failed to publish message:', error);
    }
  }

  startMessageConsumer(messageHandler: (message: Message) => void): void {
    if (!this.subscription) {
      console.error(
        'Subscription is not created. Cannot start message consumer.'
      );
      return;
    }
    this.subscription.on('message', messageHandler);
  }
}

export default PubSubHandler;

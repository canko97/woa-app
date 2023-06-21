import { PubSub, Message } from '@google-cloud/pubsub';
import { v4 as uuidv4 } from 'uuid';

class PubSubHandler {
  private pubsub: PubSub;
  private topicName: string;
  private subscriptionName: string;
  private subscription: any;

  constructor() {
    this.pubsub = new PubSub({
      keyFilename: './config/keyfile.json', // Path to your service account key file
    });
    this.topicName = 'deleteAccount';
    this.subscriptionName = `postfeed-${uuidv4()}`;
    this.subscription = null;
  }

  async createTopic(): Promise<void> {
    const [topic] = await this.pubsub.createTopic(this.topicName);
    console.log(`Topic ${topic.name} created.`);
  }

  async createSubscription(): Promise<void> {
    const [subscription] = await this.pubsub
      .topic(this.topicName)
      .createSubscription(this.subscriptionName);
    console.log(`Subscription ${subscription.name} created.`);
  }

  async publishMessage(data: string): Promise<void> {
    const dataBuffer = Buffer.from(data);
    await this.pubsub.topic(this.topicName).publish(dataBuffer);
    console.log(`Message published.`);
  }

  startMessageConsumer(messageHandler: (message: Message) => void): void {
    this.subscription = this.pubsub.subscription(this.subscriptionName);
    this.subscription.on('message', messageHandler);
  }
}

export default new PubSubHandler();

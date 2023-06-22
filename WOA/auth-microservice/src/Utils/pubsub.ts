import { PubSub, Message } from '@google-cloud/pubsub';
import { v4 as uuidv4 } from 'uuid';

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

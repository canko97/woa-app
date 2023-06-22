import { Message, PubSub } from '@google-cloud/pubsub';
import { v4 as uuidv4 } from 'uuid';

class PubSubManager {
  private static instance: PubSubManager;
  private pubSubClient: PubSub;
  private subscription: any;
  private messageHandler: ((message: Message) => void) | null;

  private constructor() {
    this.pubSubClient = new PubSub();
    this.messageHandler = null;
  }

  private async initialize() {
    const subscriptionName = 'sub-' + uuidv4();
    const topicName = 'accountDeleted';

    // Create a topic if it doesn't exist
    await this.pubSubClient.createTopic(topicName).catch((err: any) => {
      if (err.code !== 6) {
        // Topic already exists, error code 6
        console.error(err);
      }
    });

    // Create a subscription
    await this.pubSubClient
      .topic(topicName)
      .createSubscription(subscriptionName)
      .catch((err: any) => {
        console.error(err);
      });

    this.subscription = this.pubSubClient.subscription(subscriptionName);

    const handleMessage = (message: Message) => {
      if (this.messageHandler) {
        this.messageHandler(message);
      } else {
        console.warn(
          'No message handler registered. Discarding message:',
          message
        );
      }
    };

    // Listen for new messages
    this.subscription.on('message', handleMessage);
  }

  public static getInstance(): PubSubManager {
    if (!PubSubManager.instance) {
      PubSubManager.instance = new PubSubManager();
      PubSubManager.instance.initialize();
    }

    return PubSubManager.instance;
  }

  public emit(message: Message): void {
    const topicName = 'accountDeleted';
    const dataBuffer = Buffer.from(JSON.stringify(message));

    this.pubSubClient
      .topic(topicName)
      .publish(dataBuffer)
      .then((messageId: string) => {
        console.log(`Sent message with ID: ${messageId}`);
      })
      .catch((err: any) => {
        console.error(err);
      });
  }

  public registerMessageHandler(handler: (message: Message) => void): void {
    this.messageHandler = handler;
  }
}

export default PubSubManager;

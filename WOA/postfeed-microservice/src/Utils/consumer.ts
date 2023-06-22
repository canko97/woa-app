import { deleteUserPosts } from '../Services/post.service';
import { v4 as uuidv4 } from 'uuid';

const { PubSub } = require(`@google-cloud/pubsub`);

export default async function startSubscriber() {
  const pubsubClient = new PubSub();
  const subscriptionName = `Postfeed-${uuidv4()}`;
  const timeout = 60;
  const topicName = 'deleteAccount';

  async function createSubscription() {
    // Creates a new subscription
    await pubsubClient.topic(topicName).createSubscription(subscriptionName);
    console.log(`Subscription ${subscriptionName} created.`);
  }

  async function doesSubscriptionExist() {
    const subscriptions = await pubsubClient.getSubscriptions();
    const subscriptionExist = subscriptions.find(
      (sub: any) => sub.name === subscriptionName
    );
    return subscriptions && subscriptionExist;
  }

  if (!(await doesSubscriptionExist())) {
    await createSubscription();
  }

  const subscription = pubsubClient.subscription(subscriptionName);

  let messageCount = 0;

  const messageHandler = async (message: any) => {
    await console.log(`message received ${message.id}`);
    await console.log(`Data: ${message.data}`);
    await deleteUserPosts(message.data);
    messageCount += 1;

    await message.ack();
  };

  subscription.on(`message`, messageHandler);
}

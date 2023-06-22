const { PubSub } = require('@google-cloud/pubsub');
require('dotenv').config();

const pubsubClient = new PubSub();

const data = JSON.stringify({
  userId: '50001',
});
const topicName = 'deleteAccount';

async function createTopic() {
  // Creates a new topic
  await pubsubClient.createTopic(topicName);
  console.log(`Topic ${topicName} created.`);
}

async function doesTopicExist() {
  const topics = await pubsubClient.getTopics();
  const topicExists = topics.find((topic: any) => topic.name === topicName);
  return topics && topicExists;
}

if (!doesTopicExist()) {
  createTopic();
}

export default async function publishMessage(message: any) {
  const dataBuffer = Buffer.from(message);

  try {
    const messageId = await pubsubClient.topic(topicName).publish(dataBuffer);
    console.log(`Message ${messageId} published`);
  } catch (error: any) {
    console.error(`Received error while publishing: ${error.message}`);
    process.exitCode = 1;
  }
}

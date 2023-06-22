const { PubSub } = require('@google-cloud/pubsub');
require('dotenv').config();

const pubsubClient = new PubSub();

const topicName = 'deleteAccount';

async function createTopic() {
  // Creates a new topic
  try {
    await pubsubClient.createTopic(topicName);
    console.log(`Topic ${topicName} created.`);
  } catch (error: any) {
    console.error(`Error creating topic: ${error.message}`);
    throw error; // Rethrow the error to be handled by the caller
  }
}

async function doesTopicExist() {
  const topics = await pubsubClient.getTopics();
  const topicExists = topics.find((topic: any) => topic.name === topicName);
  return topics && topicExists;
}

async function publishMessage(message: any) {
  const dataBuffer = Buffer.from(message);

  try {
    const messageId = await pubsubClient.topic(topicName).publish(dataBuffer);
    console.log(`Message ${messageId} published`);
  } catch (error: any) {
    console.error(`Error publishing message: ${error.message}`);
    throw error; // Rethrow the error to be handled by the caller
  }
}

async function setupTopicAndPublishMessage(message: any) {
  try {
    if (!(await doesTopicExist())) {
      await createTopic();
    }

    await publishMessage(message);
  } catch (error: any) {
    console.error(`An error occurred: ${error.message}`);
    process.exitCode = 1;
  } finally {
    pubsubClient.close(); // Close the PubSub client to release resources
  }
}

// Example usage
const message = 'Hello, PubSub!';
setupTopicAndPublishMessage(message);

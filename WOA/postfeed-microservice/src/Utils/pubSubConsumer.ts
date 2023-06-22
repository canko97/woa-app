// import { Message } from '@google-cloud/pubsub';
// import pubsubHandler from './pubsub';
// import { deleteUserPosts } from '../Services/post.service';

// function startPubSubConsumer() {
//   try {
//     async function consumeData(): Promise<void> {
//       await pubsubHandler.createSubscription();
//       // Start consuming messages
//       await pubsubHandler.startMessageConsumer((message: Message) => {
//         console.log(`Received message: ${message.data.toString()}`);
//         deleteUserPosts(message.data.toString());
//         message.ack();
//       });
//       console.log('Consumer started');
//     }
//     consumeData();
//   } catch (error: any) {
//     console.log(error.message);
//   }
// }

// export { startPubSubConsumer };

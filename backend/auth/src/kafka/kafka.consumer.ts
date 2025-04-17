// auth/src/kafka/kafka.consumer.ts
import { Kafka } from 'kafkajs';

const kafka = new Kafka({
  clientId: 'auth-service',
  brokers: ['localhost:9092'],
});

const consumer = kafka.consumer({ groupId: 'auth-consumer' });

export async function startKafkaConsumer() {
  await consumer.connect();
  await consumer.subscribe({ topic: 'entity.created', fromBeginning: true });

  await consumer.run({
    eachMessage: async ({ topic, message }) => {
      console.log(`[Kafka][${topic}] Received:`, message.value?.toString());
      // Add your custom logic here
    },
  });
}

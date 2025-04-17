import { OnModuleInit } from '@nestjs/common';
import { Kafka } from 'kafkajs';

export class UserCreatedListener implements OnModuleInit {
  async onModuleInit() {
    const kafka = new Kafka({ brokers: ['localhost:9092'] });
    const consumer = kafka.consumer({ groupId: 'auth-service' });

    await consumer.connect();
    await consumer.subscribe({ topic: 'user.signedIn' });

    await consumer.run({
      eachMessage: async ({ message }) => {
        const payload = JSON.parse(message.toString());
        console.log('[Auth Service] User created event received:', payload);
        // Perform custom logic here
      },
    });
  }
}

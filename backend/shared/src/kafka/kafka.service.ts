// shared/kafka/kafka.service.ts
import { Kafka, Producer } from 'kafkajs';

class KafkaService {
  private static instance: KafkaService;
  private producer: Producer;

  private constructor() {
    const kafka = new Kafka({
      clientId: 'shared-kafka-client',
      brokers: ['localhost:9092'],
    });
    this.producer = kafka.producer();
    this.connectProducer();
  }

  static getInstance(): KafkaService {
    if (!KafkaService.instance) {
      KafkaService.instance = new KafkaService();
    }
    return KafkaService.instance;
  }

  private async connectProducer() {
    await this.producer.connect();
  }

  async emit(topic: string, message: any) {
    await this.producer.send({
      topic,
      messages: [{ value: JSON.stringify(message) }],
    });
    console.log(`[Kafka Emit] Topic: ${topic} | Message:`, message);
  }
}

export const kafkaService = KafkaService.getInstance();

// crm/src/bull/bull.service.ts
import { Injectable } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bullmq'; // Import from bullmq

@Injectable()
export class BullService {
  constructor(@InjectQueue('salesQueue') private readonly salesQueue: Queue) {}

  // Method to enqueue order jobs
  async enqueueOrder(orderData: any) {
    try {
      const job = await this.salesQueue.add('processCustomerOrder', orderData);
      console.log(`Job added to the queue: ${job.id}`);
      return job;
    } catch (error) {
      console.error('Error adding job to queue:', error);
      throw error;
    }
  }
}

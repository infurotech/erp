import { Injectable } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bullmq';
@Injectable()
export class NotificationService {
    constructor(@InjectQueue('notificationQueue') private notificationQueue: Queue) {}

  async createCustomerAndSendMessage(customerData: any) {

    console.log(`Creating customer: ${customerData.name}`);

    const jobData = {
      customerId: customerData.id,
      name: customerData.name,
      email: customerData.email,
      priority:'Medium',
      message: 'Hello from Sales microService',
      status:2
    };

    const job = await this.notificationQueue.add('sendMessage', jobData);
    console.log(`Job added to notifiaction queue for customer ${customerData.name}, Job ID: ${job.id}`);
  }
}

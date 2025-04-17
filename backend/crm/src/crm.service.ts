
import { Injectable } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bullmq';

@Injectable()
export class CrmService {
  constructor(@InjectQueue('salesQueue') private salesQueue: Queue) {}

  async createCustomerAndEnqueueOrder(customerData: any) {

    console.log(`Creating customer: ${customerData.name}`);

    const jobData = {
      customerId: customerData.id,
      name: customerData.name,
      email: customerData.email,
    };

    const job = await this.salesQueue.add('processCustomerOrder', jobData);
    console.log(`Job added to sales queue for customer ${customerData.name}, Job ID: ${job.id}`);
  }
}

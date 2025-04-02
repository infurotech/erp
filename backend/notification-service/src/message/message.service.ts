import { Injectable } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bullmq';
@Injectable()
export class MessageService {
    constructor(@InjectQueue('callbackQueue') private callbackQueue: Queue) {}

    async sendCallbackMessage(customerData: any) {
  
      console.log(`sending callback to sales queue: ${customerData.name}`);
  
      const jobData = {
        customerId: customerData.id,
        name: customerData.name,
        email: customerData.email,
        priority:'Medium',
        message: 'Hello message recevied now sedning call back'
      };
  
      const job = await this.callbackQueue.add('callbackMessage', jobData);
      console.log(`Job added to callback queue for sales ${customerData.name}, Job ID: ${job.id}`);
    }
}


import { Processor, Process } from '@nestjs/bull';
import { Job } from 'bullmq';
import { Injectable } from '@nestjs/common';
import { MessageService } from './message/message.service';
@Processor('notificationQueue')  // Listen to the 'salesQueue'
@Injectable()
export class JobProcessor {
    constructor(private readonly messageService: MessageService) {}
  @Process('sendMessage')  // Process jobs with the name 'processCustomerOrder'
  async processOrder(job: Job) {
    console.log(`Processing order for customer: ${job.data.name}`);
    console.log('Order Data:', job.data);  // Print the job data in Sales Service
    
    if(job.data.status==2) this.messageService.sendCallbackMessage(job.data);
    
  }
}

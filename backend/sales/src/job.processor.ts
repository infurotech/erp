// sales/src/bull/job.processor.ts
import { Processor, Process } from '@nestjs/bull';
import { Job } from 'bullmq';
import { Injectable } from '@nestjs/common';

@Processor('callbackQueue')  // Listen to the 'salesQueue'
@Injectable()
export class JobProcessor {
  @Process('callbackMessage')  // Process jobs with the name 'processCustomerOrder'
  async processOrder(job: Job) {
    console.log(`Processing order for customer: ${job.data.name}`);
    console.log('Order Data:', job.data);  // Print the job data in Sales Service
    
  }
}

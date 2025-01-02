import { Body, Controller, Get, HttpException, Injectable, Post } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bullmq';
import { Queue } from 'bullmq';
import {
  NotificationInfo,
  NotificationPriority,
} from '../../marketing/notification/notifications';
import { createBatches } from '../../marketing/bulk-processing/chunks';
@Injectable()
export class QueueProducer {
  constructor(
    @InjectQueue('notificationQueue') private notificationQueue: Queue,
  ) {}
  async addNotificationToQueue(job: NotificationInfo) {
    const batches = createBatches(job, job.notificationType == 'email' ? 100 : 80);

    try {
      for await (const batch of batches) {
        batch.map(async (work) => {
          await this.notificationQueue.add(
            'notificationQueue',
            work,
            {
              attempts: 5, 
              backoff: {
                type: 'fixed', 
                delay: 2000,
              },
            }
          );
        });
      }
      return true;
    } catch (error) {
      throw HttpException.createBody(
        error,
        'An error occured in adding notification to the queue',
        500,
      );
    }
  }
}

import { Controller, Get, HttpException, Injectable } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bullmq';
import { Queue } from 'bullmq';
import {
  NotificationInfo,
} from '../../marketing/notification/notifications';
import { createBatches } from '../../marketing/bulk-processing/chunks';
@Controller('notification')
export class QueueProducer {
  constructor(
    @InjectQueue('notificationQueue') private notificationQueue: Queue,
  ) {}
  @Get('mail')
  async addNotificationToQueue(job: NotificationInfo | NotificationInfo[]) {
    const { BATCH_SIZE_LIMIT } = process.env;
    const isArray = Array.isArray(job);
    const results = [];
    let batches;
    if (isArray) {
      console.log('Is array');
      batches = createBatches(job, BATCH_SIZE_LIMIT);
    }
    try {
      if (isArray) {
        for await (const batch of batches) {
          let batchResults = await Promise.allSettled(
            batch.map(async (work: NotificationInfo) => {
              try {
                return this.notificationQueue.add('notificationQueue', work, {
                  attempts: 5,
                  backoff: {
                    type: 'fixed',
                    delay: 2000,
                  },
                  priority: work.priority,
                });
              } catch (error) {
                console.error(error);
              }
            }),
          );
          const rejectedPromises = batchResults.filter(
            (result) => result.status === 'rejected',
          );
          results.push(...rejectedPromises);
        }
      } else {
        await this.notificationQueue.add('notificationQueue', job, {
          attempts: 5,
          backoff: {
            type: 'fixed',
            delay: 2000,
          },
          priority: job['priority'],
        });
      }
    } catch (error) {
      throw HttpException.createBody(
        error,
        'An error occurred in adding notification to the queue',
        500,
      );
    }
  }
}

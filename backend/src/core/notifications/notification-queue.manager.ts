import { Injectable } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bullmq';
import { Queue } from 'bullmq';

@Injectable()
export class NotificationQueueManager {
  constructor(
    @InjectQueue('notification') private readonly notificationQueue: Queue,
  ) {}

  async addNotificationToQueue(job: NotificationJob) {
    await this.notificationQueue.add('send-notification', job, {
      attempts: 3,
      backoff: 5000,
    });
  }
}

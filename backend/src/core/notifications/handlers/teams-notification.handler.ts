import { Injectable } from '@nestjs/common';

@Injectable()
export class TeamsNotificationHandler {
  async sendTeamsMessage(webhookUrl: string, message: string) {
    // Send notification to Teams via webhook
    console.log(`Sending Teams message to ${webhookUrl}: ${message}`);
  }
}

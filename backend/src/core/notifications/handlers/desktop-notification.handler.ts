import { Injectable } from '@nestjs/common';
import * as webPush from 'web-push';

@Injectable()
export class DesktopNotificationHandler {
  constructor() {
    // Set VAPID keys (these should ideally be stored securely, e.g., in environment variables)
    webPush.setVapidDetails(
      'mailto:your-email@example.com',
      process.env.VAPID_PUBLIC_KEY,
      process.env.VAPID_PRIVATE_KEY,
    );
  }

  async sendDesktopNotification(subscription: any, payload: any) {
    try {
      await webPush.sendNotification(subscription, JSON.stringify(payload));
    } catch (error) {
      console.error('Error sending desktop notification:', error);
    }
  }
}

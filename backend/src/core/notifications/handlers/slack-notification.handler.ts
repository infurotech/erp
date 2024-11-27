import { Injectable } from '@nestjs/common';
import { WebClient } from '@slack/web-api';

@Injectable()
export class SlackNotificationHandler {
  private slackClient = new WebClient(process.env.SLACK_BOT_TOKEN);

  async sendSlackMessage(channel: string, text: string) {
    await this.slackClient.chat.postMessage({ channel, text });
  }
}

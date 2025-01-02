import { Injectable } from '@nestjs/common';
import { NotificationInfo, NotificationPriority } from '../notifications'
import * as nodemailer from 'nodemailer';
import { EjsRendererService } from './render-templates';
@Injectable()
export class EmailService {
  constructor(private ejsRender : EjsRendererService){}
  private transporter = nodemailer.createTransport({
    pool : true,
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  async sendEmail(job: any) {
    let html = "";
    if(job?.payload?.templateName){
      html = await this.ejsRender.render(job?.payload?.templateName, job?.payload?.templateData)
    }
    await this.transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: job.payload?.to,
      subject: job.payload?.subject,
      text: job.payload?.body,
      html
    });
  }
}

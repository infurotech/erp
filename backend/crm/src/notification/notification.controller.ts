import { Controller, Post, Body } from '@nestjs/common';
import { NotificationService } from './notification.service';
@Controller('notification')
export class NotificationController {
     constructor(private readonly crmService: NotificationService) {}
    
      // Endpoint to create a customer and enqueue the order to the Sales service
      @Post('send-message')
      async sendMessage(@Body() customerData: any) {
        await this.crmService.createCustomerAndSendMessage(customerData);
        return { message: 'Customer order enqueued to notification Service' };
}
}
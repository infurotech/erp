// crm/src/crm.controller.ts

import { Controller, Post, Body } from '@nestjs/common';
import { CrmService } from './crm.service'; // Import the service

@Controller('crm') // The base path for this controller
export class CrmController {
  constructor(private readonly crmService: CrmService) {}

  // Endpoint to create a customer and enqueue the order to the Sales service
  @Post('create-customer')
  async createCustomer(@Body() customerData: any) {
    await this.crmService.createCustomerAndEnqueueOrder(customerData);
    return { message: 'Customer order enqueued to Sales Service' };
  }
}

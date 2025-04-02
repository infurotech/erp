import { Injectable } from '@nestjs/common';
import { Queue } from 'bullmq';  // Import the correct Queue from bullmq
import * as express from 'express';
import { createBullBoard } from '@bull-board/api';
import { BullMQAdapter } from '@bull-board/api/bullMQAdapter';
import { ExpressAdapter } from '@bull-board/express';

@Injectable()
export class BullBoardService {
  startBullBoard() {
    // Correct way to define Redis connection in BullMQ
    const redisConfig = {
      host: '127.0.0.1',
      port: 6379,
      password: 'foobared',  // Provide the password if needed
    };

    // Create the BullMQ queue with Rexxxxdis connection
    const someQueue = new Queue('salesQueue', {
      connection: redisConfig,  // Use the connection property for Redis configuration
    });

    const notificationQueue = new Queue('notificationQueue', {
      connection: redisConfig,  // Use the connection property for Redis configuration
    });

    const callbackQueue = new Queue('callbackQueue', {
      connection: redisConfig,  // Use the connection property for Redis configuration
    });

    // Set up BullBoard UI with ExpressAdapter
    const serverAdapter = new ExpressAdapter();
    serverAdapter.setBasePath('/admin/queues');  // The base path for the admin UI

    // Create a BullBoard instance and pass the queues to it
    const { addQueue } = createBullBoard({
      queues: [
        new BullMQAdapter(someQueue),
        new BullMQAdapter(notificationQueue),
        new BullMQAdapter(callbackQueue)
      ],
      serverAdapter: serverAdapter,
    });

    // Create an Express app to serve the BullBoard UI
    const app = express();

    // Mount the BullBoard router
    app.use('/admin/queues', serverAdapter.getRouter());

    // Start the server on port 3002
    app.listen(3002, () => {
      console.log('BullBoard UI is running on http://localhost:3002/admin/queues');
      console.log('Make sure Redis is running on port 6379');
    });
  }
}

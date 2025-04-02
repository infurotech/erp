// // sales/bull-board/bull-board.module.ts
// import { Module } from '@nestjs/common';
// import { BullModule } from '@nestjs/bull';
// import { BullBoardService } from './bull-board.service';
// import { Queue, Worker } from 'bullmq'; 
// import { ExpressAdapter } from '@bull-board/express';
// import * as express from 'express';

// @Module({
//   imports: [
//     BullModule.forRoot({
//       redis: {
//         host: 'localhost',
//         port: 6379,
//       },
//     }),
//     BullModule.registerQueue({
//       name: 'salesQueue', // The same name as used in CRM service
//     }),
//   ],
//   providers: [BullBoardService],
// })
// export class BullBoardModule {}

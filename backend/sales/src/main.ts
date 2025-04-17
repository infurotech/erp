import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
//  import { BullBoardService } from './bull-board/bull-board.service';
import { BullBoardService  } from './sales/bull-board/bull-board.service';  // Import the BullBoard function

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const bullBoardService = app.get(BullBoardService);
  bullBoardService.startBullBoard();
  await app.listen(process.env.PORT ?? 3001);
}
bootstrap();

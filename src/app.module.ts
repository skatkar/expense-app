import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SummaryModule } from './summary/summary.module';

@Module({
  imports: [SummaryModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
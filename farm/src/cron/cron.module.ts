import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bullmq';
import { CronScheduler } from './cron.scheduler';
import { AlarmConsumer } from './cron.worker';
@Module({
  imports: [
    BullModule.forRoot({
      connection: {
        host: 'localhost',
        port: 6399,
      },
    }),
    BullModule.registerQueue({
        name: 'alarm',
      }),
  ],
  providers: [
    // tuc la anh khong assign them job cho worker nua
    //CronScheduler, 
    AlarmConsumer
],
})
export class CronModule {}
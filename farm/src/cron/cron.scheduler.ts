import { InjectQueue } from '@nestjs/bullmq';
import { Injectable } from '@nestjs/common';
import { Queue } from 'bullmq';
import { Cron, CronExpression } from '@nestjs/schedule';

@Injectable()
export class CronScheduler {
  constructor(
    // inject cai queue alarm vao
    @InjectQueue('alarm') private readonly alarmQueue: Queue,
  ) {}

  // ham nay se chay 1 lan sau 10s
  // cu 1s se chay 1 lan
  @Cron('* * * * * *') // Every second
  async handleCron() {
    // moi giay thi add 1 job vao alarm queue co message la "Hello, world!"
    await this.alarmQueue.add('alarm', { message: 'Hello, world!' });
  }

  // ham nay se chay 1 lan sau 10s
  // cu 1s se chay 1 lan
  @Cron('*/5 * * * * *') // Every 5 seconds
  async handleCron2() {
    // moi giay thi add 1 job vao alarm queue co message la "Hello, world!"
    await this.alarmQueue.add('alarm', { message: 'Cuongdep trai' });
  } 

  @Cron('0 0 6 * * *') // At 06:00:00 every day
  async handleCron3() {
    await this.alarmQueue.add('alarm', { message: '6h sang t goi may' });
  }
}

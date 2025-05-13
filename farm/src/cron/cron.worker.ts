import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Job } from 'bullmq';

//class de xu ly job
@Processor('alarm')
export class AlarmConsumer extends WorkerHost {
    // lam nhu nay bull gi cho phien - goi logic la xong
  async process(job: Job<any, any, string>): Promise<any> {
    console.log("ga gay o o o");
    console.log(job.data);
    // ngu dong trong vong 1s, xu ly xong thi ngu 1s
    await new Promise(resolve => setTimeout(resolve, 1000));
    // voi job data nay cac ban lam viec
    // xu ly database
    // mobile - call alarm api cua android de tu dong bao thuc
  }
}
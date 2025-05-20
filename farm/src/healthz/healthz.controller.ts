import { Controller, Get, Header } from "@nestjs/common";
import { HealthCheckService, TypeOrmHealthIndicator, MongooseHealthIndicator, HealthCheck, MemoryHealthIndicator, DiskHealthIndicator } from "@nestjs/terminus";
import { Gauge, register } from "prom-client";
@Controller('healthz')
export class HealthzController {
    private gauge: Gauge<string>;
    constructor( private health: HealthCheckService,
      private typeOrm: TypeOrmHealthIndicator,
      private mongoose: MongooseHealthIndicator,
      private memory: MemoryHealthIndicator,
      private disk: DiskHealthIndicator,
    ) {
      this.gauge = new Gauge({
        name: 'random_value',
        help: 'Random value every second',
      });
    }
    @Get()
    //@HealthCheck()
    @Header('Content-Type', 'text/plain; version=0.0.4')
    check() {
      console.log("called by prometheus")
      const randomValue = Math.random() * 100;
      this.gauge.set(randomValue);
      return register.metrics()
      // có thể kết với intercepter - logging interceptor đo đc tốc độ xử lý request
      // đo với dung lượng bộ nhớ => tăng bộ nhớ khi cần
      // đo số request của 1 endpoint trong 1 thời điểm => endpoint nào nhiều người truy cập, => tăng cấu hình cho endpoint đó
      // đo được số conncection của socket io ddeere ensure rằng các service tải dc bao ...
      //
      // return this.health.check([
      //   () => this.typeOrm.pingCheck('postgres'),
      //   () => this.mongoose.pingCheck('mongo'),
      //   () => this.memory.checkHeap('memory_heap', 200 * 1024 * 1024),
      //   () => this.disk.checkStorage('disk', { path: 'E:/', thresholdPercent: 0.5 }),
      // ]);
    }
}
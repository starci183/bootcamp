import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { RedisIoAdapter } from './websocket/redis.adapter';

async function bootstrap() {
  // là nó sẽ load cái AppModule vào và chạy cả chương trình
  // bản chất nó NestJs App Module

  const app = await NestFactory.create(AppModule);

    // Uncomment these lines to use the Redis adapter:
    const redisIoAdapter = new RedisIoAdapter(app);
    await redisIoAdapter.connectToRedis();
    app.useWebSocketAdapter(redisIoAdapter);
 
  await app.listen(process.env.PORT ?? 5000);
}
bootstrap();

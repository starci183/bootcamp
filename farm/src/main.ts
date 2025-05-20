import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { RedisIoAdapter } from './websocket/redis.adapter';
import * as csurf from 'csurf';
import * as cookieParser from 'cookie-parser';
async function bootstrap() {
  // là nó sẽ load cái AppModule vào và chạy cả chương trình
  // bản chất nó NestJs App Module

  const app = await NestFactory.create(AppModule);

    // Uncomment these lines to use the Redis adapter:
    const redisIoAdapter = new RedisIoAdapter(app);
    await redisIoAdapter.connectToRedis();
    app.useWebSocketAdapter(redisIoAdapter);
    app.use(cookieParser());
    app.enableCors({
      origin: 'http://localhost:3000',
      credentials: true,
    });
    app.use(csurf({
      cookie: {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 1000 * 60 * 60 * 24 * 30, // 30 days
        sameSite: 'lax',
      },
    }));
 
  await app.listen(process.env.PORT ?? 5000);
}
bootstrap();

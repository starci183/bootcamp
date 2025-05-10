import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  // là nó sẽ load cái AppModule vào và chạy cả chương trình
  // bản chất nó NestJs App Module
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT ?? 5000);
}
bootstrap();

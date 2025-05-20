import { Module, ValidationPipe } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MathModule } from './math/math.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { MongooseModule } from '@nestjs/mongoose';
import { Cat, CatSchema } from './schema/cat.schema';
import { CountModule } from './count/count.module';
import { APP_INTERCEPTOR, APP_PIPE, APP_FILTER } from '@nestjs/core';
import { LoggingInterceptor } from './logging.interceptor';
import { TransformInterceptor } from './transform.interceptor';
import { AllExceptionsFilter } from './exception.filter';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { GraphqlDemoModule } from './graphql-demo/graphql-demo.module';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import { PassportModule } from './passport/passport.module';
import { CronModule } from './cron/cron.module';
import { ScheduleModule } from '@nestjs/schedule';
import { AppCacheModule } from './cache/cache.module';
import Redis from 'ioredis'
import { HelloModule } from './websocket';
import { HealthModule } from './healthz/healthz.module';
import { MailModule } from './mail/mail.module';
import { ThrottlerModule } from '@nestjs/throttler';
@Module({
  imports: [
    // import math module nay vao thi moi xai dc cai math service
    MathModule,
    CountModule,
    ScheduleModule.forRoot(),
    AppCacheModule,
    // import cái database module vào để anh xài database
    HealthModule,
    MailModule,
    ThrottlerModule.forRoot({
      throttlers: [
        // 1 phut 1 request
        {
          ttl: 60000,
          limit: 1,
        },
        // 10 phut 30 request
        {
          ttl: 600000,
          limit: 30,
        },
        // 20 phut 45 request
        {
          ttl: 1200000,
          limit: 45,
        },
      ],
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5435,
      username: 'postgres',
      password: 'mysecretpassword',
      database: 'postgres',
      entities: [
        UserEntity
      ],
      cache: {
        type: 'ioredis',
        options: {
          host: 'localhost',
          port: 6401,
          password: "Cuong123_A",
          // password: 'your_password', // Nếu có
        },
        ignoreErrors: true,
        duration: 1000000,
        alwaysEnabled: false,
      },
      synchronize: true,
    }),
    // import user repository
    TypeOrmModule.forFeature([UserEntity]),
    // farm db tức là cái database tên là farm_db
    MongooseModule.forRoot(
      'mongodb://starci:Cuong123_A@localhost:27019',
    ),
    MongooseModule.forFeature([{ name: Cat.name, schema: CatSchema }]),

    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      //auto schema tu dong taoj ra schema file co ten la schema.gql
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      playground: false,
      plugins: [ApolloServerPluginLandingPageLocalDefault()], 
    }),
    PassportModule,
    CronModule,

    GraphqlDemoModule,
    HelloModule
  ],
  controllers: [AppController],
  providers: [AppService, 
  // code tu docs ma ra
  // dang ki cai validation pipe o global scope - ap dung cho toan bo app
  // interceptor
  // {
  //   provide: APP_PIPE,
  //   useClass: ValidationPipe,
  // },
  // {
  //   provide: APP_INTERCEPTOR,
  //   useClass: LoggingInterceptor,
  // },
  // {
  //   provide: APP_INTERCEPTOR,
  //   useClass: TransformInterceptor,
  // },
  // {
  //   provide: APP_FILTER,
  //   useClass: AllExceptionsFilter,
  // }
],
})
export class AppModule {}

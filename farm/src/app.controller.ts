import { Body, Controller, Get, Post, Req, UnauthorizedException, UseGuards, UseInterceptors } from '@nestjs/common';
import { AppService } from './app.service';
import { UserEntity } from './entities/user.entity';
import { Cat } from './schema/cat.schema';
import { IsString, IsNumber, Min, MaxLength, MinLength, Matches,  } from 'class-validator';
import { LoggingInterceptor } from './logging.interceptor';
import { TransformInterceptor } from './transform.interceptor';
//import { JwtGuard } from './jwt.guard';
import * as jwt from 'jsonwebtoken';
import { JwtAuthGuard } from './passport/jwt-auth.guard';
import { request, Request } from 'express';
import { User } from './passport/user.decorator';
export const IsCuongName = () => Matches(/^cuong$/, { message: 'Name must be cuong' });

// interface khong xai dc voi class-validator, => class
export class CatRequest {
  //name khong duoc nho hon 3 ky tu va khong lon hon 10 ky tu
  @IsCuongName()
  name: string;
  
  //age phai lon hon 18
  @IsNumber()
  @Min(18)
  age: number;
  
  //breed khong duoc nho hon 3 ky tu va khong lon hon 10 ky tu
  @IsString()
  @MinLength(3)
  breed: string;
}

// cho ca controller
//@UseInterceptors(LoggingInterceptor, TransformInterceptor)
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): Promise<UserEntity> {
    return this.appService.getHello();
  }

  //scope endpoint - aps dung cho endpoint nay
  //@UseInterceptors(LoggingInterceptor, TransformInterceptor)
  // cho cai endpoint su dung interceptor
  //endpoint da duoc bao ve = jwt
  @UseGuards(JwtAuthGuard)
  @Post('cats')
  createCat(@Body() request: CatRequest): Promise<Cat> {
    return this.appService.createCat(request);
  }

  @UseGuards(JwtAuthGuard)
  @Get('cats')
  getCats(
    @User() user: { userId: number }
  ): Promise<Cat[]> {
    // passport nay no gan thong tin user vao request.user
    // query cai nay la lay user tu request.user
    console.log(`Cuong userId: ${user.userId}`);
    // dung userId de query thong tin nguoi dung voi jwt nay o db - CRUD gi day...
    return this.appService.getCats();
  }

  @Get('count')
  getCount(): Promise<number> {
    return this.appService.compute1Plus1();
  }

  @Get('test-direct-call-count-service')  
  testDirectCallCountService(): Promise<number> {
    return this.appService.testDirectCallCountService();
  }

  @Get('get-token')
  getToken(
    // nestjs co 1 loai params dac biet, @Req() la request
    @Req() request: Request
  ): Promise<string> {
    console.log(request);
    return this.appService.getToken();
  }

  @Post("sign-in")
  async signIn(@Body() request: { username: string, password: string }): Promise<string> {
    if (request.username === "cuong" && request.password === "123") {
      return jwt.sign({ userId: 1 }, 'cuongdz', { expiresIn: '1h' });
    }
    throw new UnauthorizedException("Invalid username or password");
  }

  @Get('users')
  getUsers(): Promise<UserEntity[]> {
    return this.appService.getUsers();
  }
}
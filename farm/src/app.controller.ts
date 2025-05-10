import { Body, Controller, Get, Post, UnauthorizedException, UseGuards, UseInterceptors } from '@nestjs/common';
import { AppService } from './app.service';
import { UserEntity } from './entities/user.entity';
import { Cat } from './schema/cat.schema';
import { IsString, IsNumber, Min, MaxLength, MinLength, Matches,  } from 'class-validator';
import { LoggingInterceptor } from './logging.interceptor';
import { TransformInterceptor } from './transform.interceptor';
import { JwtGuard } from './jwt.guard';
import * as jwt from 'jsonwebtoken';
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
  @UseGuards(JwtGuard)
  @Post('cats')
  createCat(@Body() request: CatRequest): Promise<Cat> {
    return this.appService.createCat(request);
  }

  @Get('cats')
  getCats(): Promise<Cat[]> {
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
  getToken(): Promise<string> {
    return this.appService.getToken();
  }

  @Post("sign-in")
  async signIn(@Body() request: { username: string, password: string }): Promise<string> {
    if (request.username === "cuong" && request.password === "123") {
      return jwt.sign({ userId: 1 }, 'cuongdz', { expiresIn: '1h' });
    }
    throw new UnauthorizedException("Invalid username or password");
  }
}
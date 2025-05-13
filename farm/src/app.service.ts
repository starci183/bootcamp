import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { MathService } from './math/math.service';
import { Repository } from 'typeorm';
import { UserEntity } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Cat } from './schema/cat.schema';
import { CatRequest } from './app.controller';
import { CountService } from './count/count.service';
import { Count2Service } from './count/count2.service';
import * as jwt from 'jsonwebtoken';
@Injectable()
export class AppService {

  constructor(
    // inject math service
    // dang inject cai math service vao cai service nay
    private readonly mathService: MathService,
    // inject user repository
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    // inject cái model vào
    @InjectModel(Cat.name) private catModel: Model<Cat>,
    // inject cái count service
    private readonly count2Service: Count2Service
  ) {}

  // return a promise // tự promise - await 
  // hàm async thì trả về promise
  // promise thì sẽ có cụm từ await-async tức chờ đợi kết quả trả về
  async getHello(): Promise<UserEntity> {
    return await this.userRepository.save({
      firstName: 'John2',
      lastName: 'Doe',
      isActive: true
    })
  }

  async getUsers(): Promise<UserEntity[]> {
    return this.userRepository.find({
      cache: true
    });
  }

  async createCat(request: CatRequest): Promise<Cat> {
    return this.catModel.create({
      name: request.name,
      age: request.age,
      breed: request.breed
    })
  }

  async getCats(): Promise<Cat[]> {
    return this.catModel.find().exec();
  }

  async compute1Plus1(): Promise<number> {
    return this.mathService.add(1, 1);
  }

  async testDirectCallCountService(): Promise<number> {
    this.count2Service.doubleIncrement();
    this.count2Service.doubleIncrement();
    this.count2Service.doubleIncrement();
    return this.count2Service.doubleIncrement();
  }

  async getToken(): Promise<string> {
    // tao ra 1 jwt token, voi content la { userId: 1 }
    // va dung key la 'cuongdz'
    // va thoi gian het han la 1h
    //throw new InternalServerErrorException("Error");
    return jwt.sign({ userId: 1 }, 'cuongdz', { expiresIn: '1h' });
  }
}

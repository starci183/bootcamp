import { Injectable } from "@nestjs/common";
import { Count2Service } from "src/count/count2.service";
@Injectable()
export class MathService {
    constructor(private readonly count2Service: Count2Service) {}

    add(a: number, b: number): number {
        this.count2Service.doubleIncrement();
        //expect = 3
        console.log(this.count2Service.count);
        return this.count2Service.count;
    }

    subtract(a: number, b: number): number {
        this.count2Service.doubleIncrement();
        return a - b;
    }

    multiply(a: number, b: number): number {
        this.count2Service.doubleIncrement();
        return a * b;
    }

    divide(a: number, b: number): number {
        this.count2Service.doubleIncrement();
        return a / b;
    }
}



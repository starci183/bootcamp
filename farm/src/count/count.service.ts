import { Injectable } from "@nestjs/common";

@Injectable()
export class CountService {
    count: number = 0;

    increment() {
        this.count++;
    }

    decrement() {
        this.count--;
    }
}



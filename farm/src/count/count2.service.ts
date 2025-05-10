import { Injectable } from "@nestjs/common";
import { CountService } from "./count.service";
@Injectable()
export class Count2Service {
    count: number = 0;
    
    constructor(private readonly countService: CountService) {}

    doubleIncrement() {
        this.countService.increment();
        this.countService.increment();

        return this.countService.count;
    }
}

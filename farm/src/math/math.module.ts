import { Module } from "@nestjs/common";
import { MathService } from "./math.service";
import { CountModule } from "../count/count.module";
@Module({
    // cung cap, cung cap nhung service nao
    providers: [MathService],
    // xuat ra nhung service 
    exports: [MathService],
    // import count module
    imports: [CountModule]
})
export class MathModule {}
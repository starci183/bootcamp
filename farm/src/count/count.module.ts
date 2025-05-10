import { Module } from "@nestjs/common";
import { CountService } from "./count.service";
import { Count2Service } from "./count2.service";
@Module({
    // cung cap, cung cap nhung service nao
    providers: [CountService, Count2Service],
    // xuat ra nhung service 
    // tại vì count module nó không xuất CountService ra ngoài mà thằng khác gọi,
    exports: [Count2Service]
})
export class CountModule {}
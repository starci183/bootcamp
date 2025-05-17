import { Module } from "@nestjs/common";
import { HelloGateway } from "./hello.gateway";

@Module({
    providers: [HelloGateway]
})
export class HelloModule {} 

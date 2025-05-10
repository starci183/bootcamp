import { Module } from "@nestjs/common";
import { GraphqlDemoResolver } from "./graphq-demo.resolver";
import { MongooseModule } from "@nestjs/mongoose";
import { Cat, CatSchema } from "src/schema/cat.schema";

@Module({
    // resolver ddatj o providers chu khong phai la controllers
    imports: [MongooseModule.forFeature([{ name: Cat.name, schema: CatSchema }])],
    providers: [GraphqlDemoResolver]
})
export class GraphqlDemoModule {}
import { Resolver, Query, Args, Mutation } from "@nestjs/graphql";
import { Author, Post, PostInput } from "./graphql-demo.dto";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Cat } from "src/schema/cat.schema";

@Resolver(() => Author)
export class GraphqlDemoResolver {
    constructor(
        @InjectModel(Cat.name) private catModel: Model<Cat>
    ) {}
    @Query(() => Author)
    async author() {
        return { id: 23, firstName: "John", lastName: "Doe" };
    }

    @Query(() => Post)
    async post(@Args('input') input: PostInput) {
        return { id: input.id, title: "Post 1", content: "Content 1" };
    }

    @Mutation(() => Post)
    async createCat1(@Args('input') input: PostInput) {
        const cat = await this.catModel.create(input);
        return { id: 5, title: "Cat 1", content: "Content 1" };
    }

    @Mutation(() => Post)
    async createCat2(@Args('input') input: PostInput) {
        const cat = await this.catModel.create(input);
        return { id: 2, title: "Cat 2", content: "Content 1" };
    }
}   
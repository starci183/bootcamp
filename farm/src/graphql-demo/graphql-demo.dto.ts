import { Field, Int, ObjectType, InputType } from '@nestjs/graphql';

// dinh nghia 1 schema trong graphql
@ObjectType()
export class Author {
  @Field(() => Int)
  id: number;

  @Field(() => String, { nullable: true })
  firstName?: string;

  @Field(() => String, { nullable: true })
  lastName?: string;
}

@InputType()
export class PostInput {
  @Field(() => Int)
  id: number;
}


@ObjectType()
export class Post {
  @Field(() => Int)
  id: number;
  
  @Field(() => String)
  title: string;

  @Field(() => String)
  content: string;
}   

import { Field, ObjectType, ID } from "type-graphql";

@ObjectType()
export class Article {
    @Field(_type => ID)
    id: string;

    @Field()
    title: string;

    @Field()
    image: string;

    @Field()
    description: string;

    @Field()
    created_at: Date;

    @Field()
    updated_at: Date;
}
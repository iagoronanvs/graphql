import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { Article } from "../models/Article";
import crypto from 'crypto';

@Resolver()
export class ArticlesResolver {
    private data: Article[] = [];

    @Query(() => [Article])
    async articles(@Arg('orderBy') orderBy: string) {
        console.log(orderBy);

        if (orderBy === 'DESC') {
            return this.data.sort((objA, objB) => Number(objB.created_at) - Number(objA.created_at));
        }

        return this.data;
    }

    @Mutation(() => Article)
    async createArticle(
        @Arg('title') title: string,
        @Arg('image') image: string,
        @Arg('description') description: string,
    ) {
        const article = {
            id: crypto.randomUUID(),
            title,
            image,
            description,
            created_at: new Date(),
            updated_at: new Date(),
        };

        this.data.push(article);

        return article;
    }
}
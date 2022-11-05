import 'reflect-metadata';

import path from 'path';
import { buildSchema } from 'type-graphql';
import { ApolloServer } from 'apollo-server';
import { ArticlesResolver } from './src/resolvers/ArticlesResolver';

async function main() {
    const schema = await buildSchema({
        resolvers: [
            ArticlesResolver,
        ],
        emitSchemaFile: path.resolve(__dirname, 'schema.gql'),
    });

    const server = new ApolloServer({
        schema,
    });

    const { url } = await server.listen();

    console.log(`Server runing on ${url}`);
}

main();


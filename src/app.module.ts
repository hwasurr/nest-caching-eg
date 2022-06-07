import { ApolloDriver } from '@nestjs/apollo';
import { CacheModule, Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { GraphQLModule } from '@nestjs/graphql';
import * as redisCacheStore from 'cache-manager-ioredis';
import { join } from 'path';
import { CatsModule } from './modules/cats/cats.module';

@Module({
  imports: [
    CacheModule.register({
      isGlobal: true,
      store: redisCacheStore,
      clusterConfig: {
        nodes: [{ host: 'localhost', port: 6379 }],
        options: { ttl: 15 },
      },
    }),
    // GraphQLModule.forRoot({
    //   driver: ApolloDriver,
    //   debug: false,
    //   autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
    //   sortSchema: true,
    // }),
    CatsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

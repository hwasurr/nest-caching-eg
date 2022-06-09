import { CacheModule, Module } from '@nestjs/common';
import * as redisCacheStore from 'cache-manager-ioredis';
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
    CatsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

import {
  CacheInterceptor,
  CallHandler,
  ExecutionContext,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { Cluster } from 'ioredis';
import { Observable, tap } from 'rxjs';
import { CACHE_EVICT_METADATA } from './cache.constants';

@Injectable()
export class HttpCacheInterceptor extends CacheInterceptor {
  private readonly CACHE_EVICT_METHODS = ['POST', 'PATCH', 'PUT', 'DELETE'];

  async intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Promise<Observable<any>> {
    const req = context.switchToHttp().getRequest<Request>();
    if (this.CACHE_EVICT_METHODS.includes(req.method)) {
      const reflector: Reflector = this.reflector;
      const evictKeys = reflector.getAllAndMerge(CACHE_EVICT_METADATA, [
        context.getClass(),
        context.getHandler(),
      ]);
      // 캐시 무효화 처리
      return next.handle().pipe(
        tap(() => {
          if (evictKeys.length > 0) return this._clearCaches(evictKeys);
          return this._clearCaches([req.originalUrl]);
        }),
      );
    }

    // 기존 캐싱 처리
    return super.intercept(context, next);
  }

  /**
   * 받은 캐시키에 해당하는 캐시 데이터를 삭제합니다. 해당 캐시키가 포함되는 모든 key에 대해 삭제합니다.
   * @param cacheKey 삭제할 캐시 키
   */
  private async _clearCaches(cacheKeys: string[]): Promise<boolean> {
    const client: Cluster = await this.cacheManager.store.getClient();
    const redisNodes = client.nodes();

    const result2 = await Promise.all(
      redisNodes.map(async (redis, index) => {
        const _keys = await Promise.all(
          cacheKeys.map((cacheKey) => redis.keys(`*${cacheKey}*`)),
        );
        const keys = _keys.flat();
        console.log(index, keys);
        return Promise.all(keys.map((key) => !!this.cacheManager.del(key)));
      }),
    );
    return result2.flat().every((r) => !!r);
  }
}

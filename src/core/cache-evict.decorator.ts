import { CustomDecorator, SetMetadata } from '@nestjs/common';
import { CACHE_EVICT_METADATA } from './httpcache.interceptor';

export const CacheEvictKeys = (
  ...cacheClearKeys: string[]
): CustomDecorator<string> =>
  SetMetadata(CACHE_EVICT_METADATA.toString(), cacheClearKeys);

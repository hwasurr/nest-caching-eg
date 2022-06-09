import {
  Body,
  Controller,
  Get,
  Post,
  UseInterceptors,
  ValidationPipe,
} from '@nestjs/common';
import { CacheEvict } from 'src/core/cache-evict.decorator';
import { HttpCacheInterceptor } from '../../core/httpcache.interceptor2';
import { CatsService } from './cats.service';
import { CreateCatDto } from './dto/cats.dto';

@Controller('cats')
@UseInterceptors(HttpCacheInterceptor)
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  @Get()
  findAll() {
    return this.catsService.findAll();
  }

  @Post()
  create(@Body(ValidationPipe) dto: CreateCatDto) {
    return this.catsService.create(dto);
  }

  @CacheEvict('/cats', '/some-different-cachekey')
  @Post('/some-different-endpoint')
  create2(@Body(ValidationPipe) dto: CreateCatDto) {
    return this.catsService.create(dto);
  }
}

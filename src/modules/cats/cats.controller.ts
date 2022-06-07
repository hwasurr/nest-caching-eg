import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseInterceptors,
  ValidationPipe,
} from '@nestjs/common';
import { HttpCacheInterceptor } from '../../core/httpcache.interceptor';
import { CatsService } from './cats.service';
import { CreateCatDto, UpdateCatDto } from './dto/cats.dto';

@Controller('cats')
@UseInterceptors(HttpCacheInterceptor)
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  @Get()
  findAll() {
    return this.catsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<any> {
    return this.catsService.findOne(id);
  }

  @Post()
  create(@Body(ValidationPipe) dto: CreateCatDto) {
    return this.catsService.create(dto);
  }

  @Patch(':id')
  update(
    @Param('id') id: number,
    @Body(ValidationPipe) dto: UpdateCatDto,
  ): Promise<any> {
    return this.catsService.update(id, dto);
  }

  @Delete(':id')
  delete(@Param('id') id: number): Promise<any> {
    return this.catsService.delete(id);
  }
}

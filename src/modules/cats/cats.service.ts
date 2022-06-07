import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';
import catsJSON from '../../data/cats.json';
import { CreateCatDto, UpdateCatDto } from './dto/cats.dto';
import { Cat } from './model/cats.model';

@Injectable()
export class CatsService {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}
  public async findAll(): Promise<Cat[]> {
    return catsJSON;
  }

  public async findOne(id: Cat['id']): Promise<Cat> {
    return catsJSON.find((cat) => cat.id === id);
  }

  public async create(dto: CreateCatDto): Promise<void> {
    await this.cacheManager.del('/cats');
    return;
  }

  public async update(id: Cat['id'], dto: UpdateCatDto): Promise<Cat> {
    return;
  }

  public async delete(id: Cat['id']): Promise<Cat> {
    return;
  }
}

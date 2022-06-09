import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';
import { createWriteStream } from 'fs';
import { join } from 'path';
import { cwd } from 'process';
import { v4 as uuidV4 } from 'uuid';
import catsJSON from '../../data/cats.json';
import { CreateCatDto } from './dto/cats.dto';
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

  public async create(dto: CreateCatDto): Promise<Cat> {
    const id = uuidV4();
    const newCat = { id, ...dto };
    const newJson = catsJSON.concat(newCat);
    return new Promise((resolve, reject) => {
      console.log();
      const stream = createWriteStream(join(cwd(), '/src/data/cats.json'), {
        autoClose: true,
      });
      stream.write(JSON.stringify(newJson, null, 2));
      stream.close();
      stream.on('finish', () => resolve(newCat));
      stream.on('error', (err) => reject(err));
    });
  }
}

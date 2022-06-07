import { Args, Query, Resolver } from '@nestjs/graphql';
import { CatsService } from './cats.service';
import { Cat } from './model/cats.model';

@Resolver(() => Cat)
export class CatsResolver {
  constructor(private readonly catsService: CatsService) {}

  @Query(() => [Cat])
  async cats(): Promise<Cat[]> {
    return this.catsService.findAll();
  }

  @Query(() => [Cat])
  async cat(@Args('id') id: Cat['id']): Promise<Cat> {
    return this.catsService.findOne(id);
  }
}

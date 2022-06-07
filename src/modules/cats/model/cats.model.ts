import { Field, Int, ObjectType } from '@nestjs/graphql';
import { ICat } from '../interface/cat.interface';

@ObjectType()
export class Cat implements ICat {
  @Field(() => Int) id: number;
  @Field() name: string;
  @Field(() => Int) age: number;
}

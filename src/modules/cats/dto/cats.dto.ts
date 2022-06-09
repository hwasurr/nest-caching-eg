import { Type } from 'class-transformer';
import { IsNumber, IsString } from 'class-validator';

export class CreateCatDto {
  @IsString() name: string;
  @Type(() => Number) @IsNumber() age: number;
}

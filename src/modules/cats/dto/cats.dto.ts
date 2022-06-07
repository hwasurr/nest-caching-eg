import { Type } from 'class-transformer';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateCatDto {
  @IsString() name: string;
  @Type(() => Number) @IsNumber() age: number;
}

export class UpdateCatDto {
  @IsOptional() @IsString() name?: string;
  @IsOptional() @Type(() => Number) @IsNumber() age?: number;
}

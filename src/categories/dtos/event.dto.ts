import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class EventDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  operation: string;

  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  value: number;
}

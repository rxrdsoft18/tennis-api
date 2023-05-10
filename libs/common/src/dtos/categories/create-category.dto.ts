import {
  ArrayMinSize,
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreateCategoryDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsString()
  @IsOptional()
  description: string;

  @IsArray()
  @IsNotEmpty({ each: true })
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => EventDto)
  events: EventDto[];
}

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

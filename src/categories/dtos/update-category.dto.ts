import {
  ArrayMinSize,
  IsArray,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { EventDto } from './event.dto';

export class UpdateCategoryDto {
  @IsNotEmpty()
  @IsString()
  name?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsArray()
  @IsNotEmpty({ each: true })
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => EventDto)
  events?: EventDto[];
}

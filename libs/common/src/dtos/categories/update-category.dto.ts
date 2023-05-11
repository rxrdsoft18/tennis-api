import {
  ArrayMinSize,
  IsArray,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { EventDto } from './create-category.dto';

export class UpdateCategoryDto {
  @IsNotEmpty()
  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsArray()
  @IsOptional()
  @IsNotEmpty({ each: true })
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => EventDto)
  events?: EventDto[];
}

import { IsMongoId, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdatePlayerDto {
  @IsOptional()
  @IsString()
  phone?: string;

  @IsOptional()
  @IsString()
  name?: string;

  @IsNotEmpty()
  @IsString()
  @IsMongoId()
  @IsOptional()
  category?: string;

  @IsOptional()
  @IsString()
  urlPhoto?: string;
}

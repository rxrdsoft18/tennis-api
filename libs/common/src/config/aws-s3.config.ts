import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AwsS3Config {
  constructor(private readonly configService: ConfigService) {}

  public AWS_S3_BUCKET_NAME =
    this.configService.get<string>('AWS_S3_BUCKET_NAME');
  public AWS_REGION = this.configService.get<string>('AWS_REGION');
  public AWS_ACCESS_KEY_ID =
    this.configService.get<string>('AWS_ACCESS_KEY_ID');
  public AWS_SECRET_ACCESS_KEY = this.configService.get<string>(
    'AWS_SECRET_ACCESS_KEY',
  );
}

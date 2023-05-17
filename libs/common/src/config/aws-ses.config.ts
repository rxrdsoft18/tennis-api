import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AwsSesConfig {
  constructor(private readonly configService: ConfigService) {}

  public AWS_REGION = this.configService.get<string>('AWS_REGION');
}

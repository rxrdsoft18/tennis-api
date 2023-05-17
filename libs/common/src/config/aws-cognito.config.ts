import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AwsCognitoConfig {
  constructor(private readonly configService: ConfigService) {}

  public AWS_COGNITO_USER_POOL_ID = this.configService.get<string>(
    'AWS_COGNITO_USER_POOL_ID',
  );
  public AWS_COGNITO_CLIENT_ID = this.configService.get<string>(
    'AWS_COGNITO_CLIENT_ID',
  );
  public AWS_REGION = this.configService.get<string>('AWS_REGION');
  public AUTHORITY = `https://cognito-idp.${this.AWS_REGION}.amazonaws.com/${this.AWS_COGNITO_USER_POOL_ID}`;
}

import { Module } from '@nestjs/common';
import { AwsCognitoService } from '@app/common/services/aws-cognito.service';
import { AwsCognitoConfig } from '@app/common/config/aws-cognito.config';

@Module({
  providers: [AwsCognitoService, AwsCognitoConfig],
  exports: [AwsCognitoService],
})
export class AwsCognitoModule {}

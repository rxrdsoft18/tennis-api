import { Module } from '@nestjs/common';
import { AwsS3Service } from '@app/common/services/aws-s3.service';
import { AwsSesService } from '@app/common/services/aws-ses.service';
import { AwsCognitoService } from '@app/common/services/aws-cognito.service';

@Module({
  providers: [AwsS3Service, AwsSesService, AwsCognitoService],
  exports: [AwsS3Service, AwsSesService, AwsCognitoService],
})
export class AwsModule {}

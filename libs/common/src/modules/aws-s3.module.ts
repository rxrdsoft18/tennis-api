import { Module } from '@nestjs/common';
import { AwsS3Service } from '@app/common/services/aws-s3.service';
import { AwsS3Config } from '@app/common/config/aws-s3.config';

@Module({
  providers: [AwsS3Service, AwsS3Config],
  exports: [AwsS3Service],
})
export class AwsS3Module {}

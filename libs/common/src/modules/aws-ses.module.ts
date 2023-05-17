import { Module } from '@nestjs/common';
import { AwsSesService } from '@app/common/services/aws-ses.service';
import { AwsSesConfig } from '@app/common/config/aws-ses.config';

@Module({
  providers: [AwsSesService, AwsSesConfig],
  exports: [AwsSesService],
})
export class AwsSesModule {}

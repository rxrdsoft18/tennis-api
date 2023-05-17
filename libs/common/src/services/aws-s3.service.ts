import { Inject, Injectable } from '@nestjs/common';
import {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
} from '@aws-sdk/client-s3';
import { AwsS3Config } from '@app/common/config/aws-s3.config';

@Injectable()
export class AwsS3Service {
  private readonly client = new S3Client({
    region: this.awsS3Config.AWS_REGION,
  });

  constructor(private readonly awsS3Config: AwsS3Config) {}

  async upload(fileName: string, file: Buffer, contentType: string) {
    return this.client.send(
      new PutObjectCommand({
        Bucket: this.awsS3Config.AWS_S3_BUCKET_NAME,
        Key: fileName,
        Body: file,
        ContentType: contentType,
      }),
    );
  }
  async getUrl(file) {
    return this.client.send(
      new GetObjectCommand({
        Bucket: this.awsS3Config.AWS_S3_BUCKET_NAME,
        Key: file,
      }),
    );
  }

  buildFullURL(filename: string) {
    return `https://${this.awsS3Config.AWS_S3_BUCKET_NAME}.s3.amazonaws.com/${filename}`;
  }
}

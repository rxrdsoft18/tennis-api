import { Injectable } from '@nestjs/common';
import {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
} from '@aws-sdk/client-s3';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AwsS3Service {
  private readonly client = new S3Client({
    region: this.configService.get('AWS_S3_REGION'),
  });

  constructor(private readonly configService: ConfigService) {}

  async upload(fileName: string, file: Buffer, contentType: string) {
    return this.client.send(
      new PutObjectCommand({
        Bucket: this.configService.get('AWS_BUCKET'),
        Key: fileName,
        Body: file,
        ContentType: contentType,
      }),
    );
  }
  async getUrl(file) {
    return this.client.send(
      new GetObjectCommand({
        Bucket: this.configService.get('AWS_BUCKET'),
        Key: file,
      }),
    );
  }

  buildFullURL(filename: string) {
    return `https://${this.configService.get(
      'AWS_BUCKET',
    )}.s3.amazonaws.com/${filename}`;
  }
}

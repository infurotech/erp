
import { Injectable, Inject } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { Express} from 'multer';
import { extname } from 'path';
import * as fs from 'fs';

@Injectable()
export class StorageService {
  private s3Client: S3Client;

  constructor(private configService: ConfigService) {
    const storageType = this.configService.get<string>('storageType');
    if (storageType === 's3' || storageType === 'minio') {
      this.s3Client = new S3Client({
        region: this.configService.get<string>('region'),
        credentials: {
          accessKeyId: this.configService.get<string>('accessKeyId'),
          secretAccessKey: this.configService.get<string>('secretAccessKey')
        },
        endpoint: storageType === 'minio' ? this.configService.get<string>('url') :`http://localhost:9000`, // MinIO endpoint
      });
    }
  }

  async uploadFile(file: Express.Multer.File): Promise<string> {
    const storageType = this.configService.get<string>('storageType');
    if (storageType === 's3' || storageType === 'minio') {
      return this.uploadToS3(file);
    } else if (storageType === 'file') {
      return this.saveToLocal(file);
    }
    throw new Error('Unsupported storage type');
  }

  private async uploadToS3(file: Express.Multer.File): Promise<string> {
    const bucketName = this.configService.get<string>('bucketName');
    const fileKey = `uploads/${file.originalname}`;
    const params = {
      Bucket: bucketName,
      Key: fileKey,
      Body: fs.createReadStream(file.path),
    };
    await this.s3Client.send(new PutObjectCommand(params));
    return `https://${bucketName}.s3.amazonaws.com/${fileKey}`;
  }

  private async saveToLocal(file: Express.Multer.File): Promise<string> {
    const uploadPath = this.configService.get<string>('uploadPath');
    const filePath = `${'./temp'}/${file.originalname}`;
    fs.renameSync(file.path, filePath);
    return filePath;
  }
}

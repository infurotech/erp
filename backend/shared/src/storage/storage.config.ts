import { ConfigModule, ConfigService } from '@nestjs/config';

export const StorageConfig = () => ({
  storageType: process.env.STORAGE_TYPE || 'file', // Default to file
  s3: {
    bucketName: process.env.STORAGE_BUCKET,
    region: process.env.STORAGE_REGION,
    accessKeyId: process.env.STORAGE_ACCESS_KEY_ID,
    secretAccessKey: process.env.STORAGE_SECRET_ACCESS_KEY,
    url: process.env.STORAGE_URL,
  },
  file: {
    uploadPath: process.env.FILE_STORAGE_PATH || './uploads',
  },
});

import { Injectable } from '@nestjs/common';

@Injectable()
export class DocumentService {
  handleFileUpload(file: Express.Multer.File): string {
    return `File saved as: ${file.filename}`;
  }
}

import {
    Controller,
    Post,
    UploadedFile,
    UseInterceptors,
  } from '@nestjs/common';
  import { FileInterceptor } from '@nestjs/platform-express';
  import { diskStorage } from 'multer';
  import { extname } from 'path';
  
  
  @Controller('document')
  export class DocumentController {
    @Post('upload')
    @UseInterceptors(
      FileInterceptor('file', {
        storage: diskStorage({
          destination: './uploads', // Directory where files will be saved
          filename: (req, file, callback) => {
            
            const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
            const ext = extname(file.originalname);
            callback(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
          },
        }),
      }),
    )
    uploadFile(@UploadedFile() file: Express.Multer.File) {
      
      return {
        message: 'File uploaded successfully!',
        filePath: `/uploads/${file.filename}`,
      };
    }
  }
  
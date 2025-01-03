import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { join } from 'path';
import * as ejs from 'ejs';
import { promisify } from 'util';

@Injectable()
export class EjsRendererService {
  private renderFileAsync: (path: string, data: any) => Promise<string>;

  constructor() {
    // Explicitly bind the correct function signature
    this.renderFileAsync = promisify(
      (filePath: string, data: any, callback: (err: Error | null, str?: string) => any) => {
        ejs.renderFile(filePath, data != "" ? data : {}, callback).catch(err => err);
      },
    );
  }

  async render(templateName: string, data: any): Promise<string> {
    const templatePath = join(__dirname, 'templates', `${templateName}.ejs`);
    console.log('Rendering EJS File at:', templatePath);
    try{
      
    return await this.renderFileAsync(templatePath, data); 
    }
    catch(error){
      console.error("Invalid or insufficient data",templateName, error);
    }
  }
}

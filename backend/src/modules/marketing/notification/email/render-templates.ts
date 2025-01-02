import { Injectable } from '@nestjs/common';
import { join } from 'path';
import * as ejs from 'ejs';

@Injectable()
export class EjsRendererService {
  async render(templateName: string, data: any): Promise<string> {
    const templatePath = join(__dirname, 'templates', `${templateName}.ejs`);
    console.log('Rendering EJS File at:', templatePath);
    return new Promise((resolve, reject) => {
      ejs.renderFile(templatePath, data, (err, str) => {
        if (err) {
          return reject(err);
        }
        resolve(str);
      });
    });
  }
}

import { BadRequestException, Injectable } from '@nestjs/common';
import { existsSync } from 'fs';
import { join } from 'path';
@Injectable()
export class FilesService {
  getStaticImage(type: string, image: string) {
    const path = join(__dirname, `../../../static/${type}`, image);

    if (!existsSync(path)) throw new BadRequestException('No found image');
    return path;
  }
}

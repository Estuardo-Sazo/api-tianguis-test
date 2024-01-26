import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
  BadRequestException,
  Param,
  Get,
  Res,
  Inject,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { fileFilter } from '../helpers/file-filter-helper';
import { fileNamer } from '../helpers/file-namer-helper';
import { FilesService } from '../services/files.service';
import { Response } from 'express';
import config from '../../config';
import { ConfigType } from '@nestjs/config';

@Controller('files')
export class FilesController {
  constructor(
    @Inject(config.KEY) private configService: ConfigType<typeof config>,
    private readonly filesService: FilesService,
  ) {}

  @Get('/:type/:imageName')
  findImage(
    @Res() res: Response,
    @Param('type') type: string,
    @Param('imageName') imageName: string,
  ) {
    const path = this.filesService.getStaticImage(type, imageName);
    /* res.status(403).json({
      ok: true,
      path,
    }); */
    res.sendFile(path);
  }

  @Post('product')
  @UseInterceptors(
    FileInterceptor('file', {
      fileFilter: fileFilter,
      //limits: { fileSize: 1000 },
      storage: diskStorage({
        destination: './static/products',
        filename: fileNamer,
      }),
    }),
  )
  uploadProductFile(@UploadedFile() file: Express.Multer.File) {
    if (!file)
      throw new BadRequestException('Make sire that the file is an image');

    const secureUrl = `${this.configService.hostapi}files/products/${file.filename}`;
    //const secureUrl = `${file.filename}`;
    return {
      secureUrl,
    };
  }

  @Post('profiles')
  @UseInterceptors(
    FileInterceptor('file', {
      fileFilter: fileFilter,
      //limits: { fileSize: 1000 },
      storage: diskStorage({
        destination: './static/profiles',
        filename: fileNamer,
      }),
    }),
  )
  uploadProfileFile(@UploadedFile() file: Express.Multer.File) {
    if (!file)
      throw new BadRequestException('Make sire that the file is an image');

    const secureUrl = `${this.configService.hostapi}files/profiles/${file.filename}`;
    //const secureUrl = `${file.filename}`;
    return {
      secureUrl,
    };
  }
}

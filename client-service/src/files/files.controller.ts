import { Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiTags } from '@nestjs/swagger';
import { diskStorage } from 'multer';
import { FilesService } from './files.service';

@ApiTags('files')
@Controller('files')
export class FilesController {
    constructor(
        private fileService: FilesService
    ) { }
    @Post()
    @UseInterceptors(FileInterceptor('files', {
        storage: diskStorage({
            destination: './src/files', filename: (_req, file, cb) => {
                cb(null, file.originalname)
            }
        })
    }))
    async uploadFile(@UploadedFile() file: Express.Multer.File) {
      return await this.fileService.createProductCSV(file);
    }
}
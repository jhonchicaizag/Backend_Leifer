import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UploadedFile,
} from '@nestjs/common';
import { VideosService } from './videos.service';
import { CreateVideoDto } from './dto/create-video.dto';
import { UpdateVideoDto } from './dto/update-video.dto';
import { ApiTags } from '@nestjs/swagger/dist/decorators/api-use-tags.decorator';
import { UseInterceptors } from '@nestjs/common/decorators/core/use-interceptors.decorator';
import { LoggerInterceptor } from 'src/utils/logger.interceptor';
import { FileInterceptor } from '@nestjs/platform-express';
import { storage } from 'src/utils/media.handle';
@ApiTags('videos')
@UseInterceptors(LoggerInterceptor)
@Controller('videos')
// @UsePipes(new ValidationPipe()) //sirve para validar class-validator instalado con npm, se usa cuando solo tengamos que validar algo y no aplicar a todo el proyecto
export class VideosController {
  constructor(private readonly videosService: VideosService) {}

  @Post()
  create(@Body() createVideoDto: CreateVideoDto) {
    return this.videosService.create(createVideoDto);
  }

  @Post('upload') //TODO: forma de cargar archivos
  @UseInterceptors(FileInterceptor('avatar', { storage: storage }))
  handleUpload(@UploadedFile() file: Express.Multer.File) {
    console.log(file);
  }

  @Get()
  findAll(@Query() query: string) {
    console.log(query);
    return this.videosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.videosService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateVideoDto: UpdateVideoDto) {
    return this.videosService.update(+id, updateVideoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.videosService.remove(+id);
  }
}

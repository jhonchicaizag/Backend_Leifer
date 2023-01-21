import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
  SetMetadata,
} from '@nestjs/common';
import { CoursesService } from './courses.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { ApiTags } from '@nestjs/swagger/dist/decorators';
import { ApiBearerAuth } from '@nestjs/swagger/dist/decorators/api-bearer.decorator';
import { SlugPipe } from './pipes/slug/slug.pipe';
import { BrowserAgentGuard } from '../guards/browser-agent.guard';
import { JwtGuardGuard } from '../guards/jwt-guard/jwt-guard.guard';
import { Request } from 'express';
import { RolesGuard } from '../guards/roles/roles.guard';
import { Rol } from 'src/decorators/rol.decorator.ts/rol.decorator.ts.decorator';

@ApiTags('courses')
@Controller('courses')
@UseGuards(BrowserAgentGuard, JwtGuardGuard, RolesGuard)
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) {}

  @Post()
  @ApiBearerAuth()
  @Rol(['adm'])
  create(@Req() req: Request, @Body() createCourseDto: CreateCourseDto) {
    return this.coursesService.create(createCourseDto);
  }

  @Get()
  findAll() {
    return this.coursesService.findAll();
  }

  @Get(':title')
  @Rol(['a', 'manager'])
  findOne(@Param('title', new SlugPipe()) title: string) {
    console.log(title);
    return this.coursesService.findOne(title);
  }

  @Patch(':id')
  @ApiBearerAuth()
  update(@Param('id') id: string, @Body() updateCourseDto: UpdateCourseDto) {
    return this.coursesService.update(+id, updateCourseDto);
  }

  @Delete(':id')
  @ApiBearerAuth()
  remove(@Param('id') id: string) {
    return this.coursesService.remove(+id);
  }
}

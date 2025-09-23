import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
  ParseFilePipe,
  MaxFileSizeValidator,
  FileTypeValidator,
  HttpException,
  HttpStatus,
  UseGuards,
  Req,
  Get,
  Param,
  Delete, // Import Delete decorator
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ResumesService } from './resumes.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Request } from 'express';

@Controller('resumes')
export class ResumesController {
  constructor(private readonly resumesService: ResumesService) {}

  // --- NEW ENDPOINT: Get all resumes for the logged-in user ---
  @UseGuards(JwtAuthGuard)
  @Get()
  findAllForUser(@Req() req: Request & { user: { sub: string } }) {
    const userId = req.user.sub;
    return this.resumesService.findAllForUser(userId);
  }

  @Post('upload')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('file'))
  uploadAndParseResume(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 5 * 1024 * 1024 }),
          new FileTypeValidator({ fileType: /pdf|wordprocessingml/ }),
        ],
        exceptionFactory: (error) => {
          throw new HttpException(error, HttpStatus.BAD_REQUEST);
        },
      }),
    )
    file: Express.Multer.File,
    @Req() req: Request & { user: { sub: string } },
  ) {
    const userId = req.user.sub;
    return this.resumesService.createResume(file, userId);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  findOne(@Param('id') id: string) {
    return this.resumesService.findOne(id);
  }

  @Get(':id/matches')
  @UseGuards(JwtAuthGuard)
  findMatches(@Param('id') id: string) {
    return this.resumesService.findJobMatches(id);
  }

  // --- NEW ENDPOINT: Delete a resume ---
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(
    @Param('id') id: string,
    @Req() req: Request & { user: { sub: string } },
  ) {
    const userId = req.user.sub;
    return this.resumesService.remove(id, userId);
  }
}
import {
  Controller,
  Post, // Use the main POST endpoint
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
  Delete,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ResumesService } from './resumes.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Request } from 'express';

@Controller('resumes')
export class ResumesController {
  constructor(private readonly resumesService: ResumesService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  findAllForUser(@Req() req: Request & { user: { sub: string } }) {
    const userId = req.user.sub;
    return this.resumesService.findAllForUser(userId);
  }

  // --- THE DEFINITIVE FIX: The endpoint is now POST /resumes, which is the standard ---
  @Post() 
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('file'))
  createResume( // Renamed the method for clarity
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 5 * 1024 * 1024 }), // 5MB
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
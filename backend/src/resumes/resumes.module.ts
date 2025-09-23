import { Module } from '@nestjs/common';
import { ResumesController } from './resumes.controller';
import { ResumesService } from './resumes.service';
import { PrismaModule } from 'src/prisma/prisma.module'; // <-- Import PrismaModule

@Module({
  imports: [PrismaModule], // <-- Add PrismaModule here
  controllers: [ResumesController],
  providers: [ResumesService],
})
export class ResumesModule {}
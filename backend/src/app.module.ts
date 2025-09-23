import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module'; // <-- Keep this import
import { ResumesModule } from './resumes/resumes.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [PrismaModule, ResumesModule, AuthModule], // <-- Make sure both modules are here
  controllers: [AppController],
  providers: [AppService],
  // We no longer need providers or exports for PrismaService here
})
export class AppModule {}
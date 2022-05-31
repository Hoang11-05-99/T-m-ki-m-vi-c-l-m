import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './module/auth.module';
import { CVModule } from './module/cv.module';
import { ProfileModule } from './module/profile.module';
import { RecruitmentModule } from './module/recruitment.module';
import { UploadModule } from './module/upload.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot('mongodb://localhost/DATN'),
    AuthModule,
    ProfileModule,
    RecruitmentModule,
    CVModule,
    UploadModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

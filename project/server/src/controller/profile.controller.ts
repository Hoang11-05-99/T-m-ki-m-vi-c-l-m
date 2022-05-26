import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { CreateProfileDTO } from 'src/dto/createProfileDto';
import { JwtAuthGuard } from 'src/guards/jwt.guard';
import { ProfileService } from 'src/service/profile.service';

@Controller('user')
export class ProfileController {
  constructor(private profileService: ProfileService) {}

  @UseGuards(JwtAuthGuard)
  @Post('createProfile')
  createProfile(@Req() req, @Body() profile: CreateProfileDTO) {
    try {
      return this.profileService.createProfile(
        req.user.role,
        req.user._id,
        profile,
      );
    } catch (error) {
      throw new HttpException(
        {
          result: null,
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          message: 'Lỗi server !!!',
        },
        HttpStatus.OK,
      );
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get('getProfile')
  getProfile(@Req() req) {
    try {
      return this.profileService.getProfile(req.user.role, req.user._id);
    } catch (error) {
      throw new HttpException(
        {
          result: null,
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          message: 'Lỗi server !!!',
        },
        HttpStatus.OK,
      );
    }
  }

  @UseGuards(JwtAuthGuard)
  @Put('updateProfile')
  updateProfile(@Req() req, @Body() profile: CreateProfileDTO) {
    try {
      return this.profileService.updateProfile(
        req.user.role,
        req.user._id,
        profile,
      );
    } catch (error) {
      throw new HttpException(
        {
          result: null,
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          message: 'Lỗi server !!!',
        },
        HttpStatus.OK,
      );
    }
  }
}

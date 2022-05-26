import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Post,
  Put,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { CreateRecruitmentDTO } from 'src/dto/createRecruitmentDto';
import { JwtAuthGuard } from 'src/guards/jwt.guard';
import { RecruitmentService } from 'src/service/recruitment.service';

@Controller('recruitment')
export class RecruitmentController {
  constructor(private recruitmentService: RecruitmentService) {}

  @Get('getAll')
  getAll() {
    return this.recruitmentService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get('getAllNotAccept')
  getAllNotAccept(@Req() req) {
    return this.recruitmentService.findAllNotAccept(req.user.role);
  }

  @UseGuards(JwtAuthGuard)
  @Get('getAllCreator')
  getAllCreator(@Req() req) {
    return this.recruitmentService.findAllCreator(req.user._id);
  }

  @UseGuards(JwtAuthGuard)
  @Post('create')
  createProfile(@Req() req, @Body() recruitment: CreateRecruitmentDTO) {
    try {
      return this.recruitmentService.createRecruitment(
        req.user.status,
        req.user._id,
        recruitment,
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
  @Put('update')
  updateRecruitment(
    @Req() req,
    @Query('id') id: string,
    @Body() recruitment: CreateRecruitmentDTO,
  ) {
    try {
      return this.recruitmentService.updateRecruitment(
        req.user.status,
        req.user._id,
        req.user.role,
        id,
        recruitment,
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
  @Delete('updateRecruitmentAdmin')
  updateRecruitmentAdmin(@Req() req, @Query('id') id: string) {
    try {
      return this.recruitmentService.updateRecruitmentAdmin(req.user.role, id);
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
  @Delete('delete')
  deleteRecruitment(@Req() req, @Query('id') id: string) {
    try {
      return this.recruitmentService.deleteRecruitment(req.user._id, id);
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
  @Get('get')
  getRecruitment(@Req() req, @Query('id') id: string) {
    try {
      return this.recruitmentService.getRecruitment(id);
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

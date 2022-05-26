import {
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Put,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/guards/jwt.guard';
import { CVService } from 'src/service/cv.service';

@Controller('cv')
export class CVController {
  constructor(private cvService: CVService) {}

  @UseGuards(JwtAuthGuard)
  @Get('create')
  createProfile(@Req() req, @Query('id') id: string) {
    try {
      return this.cvService.createCV(
        req.user.status,
        req.user.role,
        req.user._id,
        id,
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
  @Get('getStatusTrue')
  getStatusTrueCv(@Req() req) {
    try {
      return this.cvService.getStatusTrueCv(req.user._id);
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
  @Get('getStatusFalse')
  getStatusFalseCv(@Req() req) {
    try {
      return this.cvService.getStatusFalseCv(req.user._id);
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
  getCv(@Req() req) {
    try {
      return this.cvService.getCv(req.user._id);
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
  @Get('details')
  detailsCv(@Req() req, @Query('id') id: string) {
    try {
      return this.cvService.detailsCv(req.user._id, req.user.role, id);
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
  @Get('updateStatus')
  updateStatusCV(@Req() req, @Query('id') id: string) {
    try {
      return this.cvService.updateStatusCv(req.user._id, req.user.role, id);
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
  deleteCV(@Req() req, @Query('id') id: string) {
    try {
      return this.cvService.deleteCv(req.user._id, req.user.role, id);
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

import { MailerService } from '@nestjs-modules/mailer';
import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { CreateAccountDTO } from 'src/dto/createAccountDto';
import { JwtAuthGuard } from 'src/guards/jwt.guard';
import { AuthService } from 'src/service/auth.service';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private mailService: MailerService,
  ) {}

  @Post('register')
  register(@Body() user: CreateAccountDTO) {
    return this.authService.registerAccount(user);
  }

  @Post('login')
  login(@Body() user: CreateAccountDTO) {
    return this.authService.login(user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('getAccount')
  getAccount(@Req() req) {
    return this.authService.getAccount(req.user._id);
  }

  @UseGuards(JwtAuthGuard)
  @Get('getAllAccount')
  getAllAccount(@Req() req) {
    return this.authService.getAllAccount(req.user.role);
  }

  @UseGuards(JwtAuthGuard)
  @Get('updateStatusAccount')
  updateStatusAccount(@Req() req, @Query('id') id: string) {
    return this.authService.updateStatusAccount(req.user.role, id);
  }

  @Get('sendEmail')
  async send(@Query('email') email) {
    await this.mailService.sendMail({
      to: email,
      from: 'hoangk58cntt@gmail.com',
      subject: 'Simple Plain Text',
      text: 'Welcome to nestjs email demo',
    });
    return 'ok';
  }
}

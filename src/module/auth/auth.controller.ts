import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import AuthService from './auth.service';
import type { Response } from 'express';
import sendResponse from 'src/helpers/send-response';
import LoginDTO from './dto/login.dto';

@Controller('auth')
class AuthController {
  constructor(private readonly service: AuthService) {}

  @Post('/login')
  async login(@Res() res: Response, @Body() body: LoginDTO) {
    const response = await this.service.login(body);

    sendResponse(res, {
      status_code: HttpStatus.OK,
      message: 'Login successful.',
      data: response,
    });
  }
}

export default AuthController;

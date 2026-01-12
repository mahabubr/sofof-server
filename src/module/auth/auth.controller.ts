import { Controller, HttpStatus, Post, Res } from '@nestjs/common';
import AuthService from './auth.service';
import type { Request, Response } from 'express';
import sendResponse from 'src/helpers/send-response';

@Controller('auth')
class AuthController {
  constructor(private readonly service: AuthService) {}

  @Post('/login')
  async login(@Res() res: Response) {
    const response = await this.service.login();

    sendResponse(res, {
      status_code: HttpStatus.OK,
      message: 'Login successful.',
      data: response,
    });
  }
}

export default AuthController;

import { Module } from '@nestjs/common';
import AuthController from './auth.controller';
import AuthService from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    JwtModule.register({ secret: process.env.JWT_SECRET, signOptions: { expiresIn: '10d' } }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [],
})
export default class AuthModule {}

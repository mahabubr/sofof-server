import { Module } from '@nestjs/common';
import TodoController from './todo.controller';
import TodoService from './todo.service';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    JwtModule.register({ secret: process.env.JWT_SECRET, signOptions: { expiresIn: '10d' } }),
  ],
  controllers: [TodoController],
  providers: [TodoService],
  exports: [],
})
export default class TodoModule {}

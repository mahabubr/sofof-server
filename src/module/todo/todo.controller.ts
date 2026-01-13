import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import TodoService from './todo.service';
import type { Request, Response } from 'express';
import CreateTodoDto from './dto/create-todo.dto';
import sendResponse from 'src/helpers/send-response';
import type { ITodoFilter, ITodoParams } from './todo.interface';
import UpdateTodoDto from './dto/update-todo.dto';
import UserGuard from 'src/guard/user.guard';

@Controller('todo')
class TodoController {
  constructor(private readonly service: TodoService) {}

  @Post('/')
  @UseGuards(UserGuard)
  async create(@Res() res: Response, @Req() req: Request, @Body() body: CreateTodoDto) {
    const response = await this.service.create(body, req.user);

    sendResponse(res, {
      status_code: HttpStatus.OK,
      message: 'Todo created successful.',
      data: response,
    });
  }

  @Get('/')
  @UseGuards(UserGuard)
  async get(@Res() res: Response, @Req() req: Request, @Query() query: ITodoFilter) {
    const response = await this.service.get(req.user, query);

    sendResponse(res, {
      status_code: HttpStatus.OK,
      message: 'Todos retrieved successfully.',
      data: response,
    });
  }

  @Get('/:id')
  @UseGuards(UserGuard)
  async single(@Res() res: Response, @Req() req: Request, @Param() params: ITodoParams) {
    const response = await this.service.single(params, req.user);

    sendResponse(res, {
      status_code: HttpStatus.OK,
      message: 'Todo retrieved successfully.',
      data: response,
    });
  }

  @Patch('/:id')
  @UseGuards(UserGuard)
  async update(
    @Res() res: Response,
    @Req() req: Request,
    @Param() params: ITodoParams,
    @Body() body: UpdateTodoDto,
  ) {
    const response = await this.service.update(body, params, req.user);

    sendResponse(res, {
      status_code: HttpStatus.OK,
      message: 'Todo updated successfully.',
      data: response,
    });
  }

  @Delete('/:id')
  @UseGuards(UserGuard)
  async delete(@Res() res: Response, @Req() req: Request, @Param() params: ITodoParams) {
    const response = await this.service.delete(params, req.user);

    sendResponse(res, {
      status_code: HttpStatus.OK,
      message: 'Todo deleted successfully.',
      data: response,
    });
  }
}

export default TodoController;

import { Injectable } from '@nestjs/common';
import DatabaseService from '../../database/database.service';
import CreateTodoDto from './dto/create-todo.dto';
import IAuthUser from 'src/interface/auth-user.interface';
import { ITodoFilter, ITodoParams } from './todo.interface';
import UpdateTodoDto from './dto/update-todo.dto';

@Injectable()
class TodoService {
  constructor(private readonly db: DatabaseService) {}

  async create(payload: CreateTodoDto, user: IAuthUser) {
    const { id } = user;

    const data = { ...payload, user_id: id };

    const result = await this.db.todo.create({ data });

    return result;
  }

  async get(user: IAuthUser, query: ITodoFilter) {
    const { id } = user;

    const { status } = query;

    const result = await this.db.todo.findMany({
      where: { user_id: id, ...(status && { status }) },
      orderBy: { updated_at: 'desc' },
    });

    return result;
  }

  async single(params: ITodoParams, user: IAuthUser) {
    const { id: user_id } = user;

    const { id } = params;

    const result = await this.db.todo.findUnique({ where: { id, user_id } });

    return result;
  }

  async update(payload: UpdateTodoDto, params: ITodoParams, user: IAuthUser) {
    const { id: user_id } = user;

    const { id } = params;

    const data = { ...payload };

    const result = await this.db.todo.update({ where: { id, user_id }, data });

    return result;
  }

  async delete(params: ITodoParams, user: IAuthUser) {
    const { id: user_id } = user;

    const { id } = params;

    const result = await this.db.todo.delete({ where: { id, user_id } });

    return result;
  }
}

export default TodoService;

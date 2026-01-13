import { Test, TestingModule } from '@nestjs/testing';
import TodoService from './todo.service';
import DatabaseService from '../../database/database.service';
import CreateTodoDto from './dto/create-todo.dto';
import IAuthUser from 'src/interface/auth-user.interface';

const mockDb = {
  todo: {
    create: jest.fn(),
    findMany: jest.fn(),
  },
};

let todoService: TodoService;

beforeEach(async () => {
  const module: TestingModule = await Test.createTestingModule({
    providers: [TodoService, { provide: DatabaseService, useValue: mockDb }],
  }).compile();

  todoService = module.get<TodoService>(TodoService);
});

describe('TodoService - create', () => {
  it('should create a todo item for the user', async () => {
    const user: IAuthUser = { id: '1' };

    const payload: CreateTodoDto = {
      title: 'Test Todo',
      description: 'Test description',
      status: 'pending',
    };

    const createdTodo = { id: 10, ...payload, user_id: user.id };

    mockDb.todo.create.mockResolvedValue(createdTodo);

    const result = await todoService.create(payload, user);

    expect(mockDb.todo.create).toHaveBeenCalledWith({
      data: { ...payload, user_id: user.id },
    });

    expect(result).toEqual(createdTodo);
  });

  it('should return all todos for the user without status filter', async () => {
    const user: IAuthUser = { id: '1' };
    const query: any = {};

    const todos = [
      { id: 1, title: 'Todo 1', status: 'pending', user_id: user.id },
      { id: 2, title: 'Todo 2', status: 'completed', user_id: user.id },
    ];

    mockDb.todo.findMany.mockResolvedValue(todos);

    const result = await todoService.get(user, query);

    expect(mockDb.todo.findMany).toHaveBeenCalledWith({
      where: { user_id: user.id },
      orderBy: { updated_at: 'desc' },
    });

    expect(result).toEqual(todos);
  });

  it('should return todos filtered by status', async () => {
    const user: IAuthUser = { id: '1' };
    const query: any = { status: 'pending' };

    const todos = [{ id: 1, title: 'Todo 1', status: 'pending', user_id: user.id }];

    mockDb.todo.findMany.mockResolvedValue(todos);

    const result = await todoService.get(user, query);

    expect(mockDb.todo.findMany).toHaveBeenCalledWith({
      where: { user_id: user.id, status: 'pending' },
      orderBy: { updated_at: 'desc' },
    });

    expect(result).toEqual(todos);
  });
});

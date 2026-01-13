import { TodoStatus } from '@prisma/client';

export interface ITodoParams {
  id: string;
}

export interface ITodoFilter {
  status: TodoStatus;
}

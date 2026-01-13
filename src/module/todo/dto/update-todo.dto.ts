import { TodoStatus } from '@prisma/client';
import { IsString, IsOptional, IsEnum } from 'class-validator';

class UpdateTodoDto {
  @IsOptional()
  @IsString({ message: 'Title must be a string.' })
  title: string;

  @IsOptional()
  @IsString({ message: 'Description, if provided, must be a string.' })
  description: string;

  @IsOptional()
  @IsEnum(TodoStatus, { message: `Status must be one of the following: ${Object.values(TodoStatus).join(', ')}.` })
  status: TodoStatus;
}

export default UpdateTodoDto;

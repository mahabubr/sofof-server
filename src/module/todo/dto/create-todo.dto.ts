import { TodoStatus } from '@prisma/client';
import { IsString, IsOptional, IsEnum, IsNotEmpty } from 'class-validator';

class CreateTodoDto {
  @IsString({ message: 'Title must be a string.' })
  @IsNotEmpty({ message: 'Title cannot be empty.' })
  title: string;

  @IsOptional()
  @IsString({ message: 'Description, if provided, must be a string.' })
  description: string;

  @IsEnum(TodoStatus, {
    message: `Status must be one of the following: ${Object.values(TodoStatus).join(', ')}.`,
  })
  @IsNotEmpty({ message: 'Status cannot be empty.' })
  status: TodoStatus;
}

export default CreateTodoDto;

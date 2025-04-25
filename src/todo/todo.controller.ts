import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { TodoService } from './todo.service';
import { Todo } from './entities/todo.entity';

@Controller('todos')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Get()
  async findAll(): Promise<Todo[]> {
    return this.todoService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: Todo['id']): Promise<Todo | null> {
    const todo = await this.todoService.findOne(id);
    if (!todo) {
      throw new NotFoundException(`Todo with id ${id} not found`);
    }
    return todo;
  }

  @Post()
  async create(@Body() todo: Todo): Promise<Todo> {
    if (!todo.title) {
      throw new BadRequestException('Title is required');
    }
    return this.todoService.create(todo);
  }

  @Put(':id')
  async update(
    @Param('id') id: Todo['id'],
    @Body() todo: Todo,
  ): Promise<Todo | null> {
    if (!todo.title) {
      throw new BadRequestException('Title is required');
    }
    return this.todoService.update(id, todo);
  }

  @Delete(':id')
  async delete(@Param('id') id: Todo['id']): Promise<void> {
    return this.todoService.delete(id);
  }
}

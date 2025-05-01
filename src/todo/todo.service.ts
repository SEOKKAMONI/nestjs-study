import { Injectable, Inject, BadRequestException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CreateTodoRequestDto } from './dtos/requests/create-todo.dto';
import { TodoResponseDto } from './dtos/responses/todo.dto';
import { UpdateTodoRequestDto } from './dtos/requests/update-todo.dto';
import { Todo } from './entities/todo.entity';

@Injectable()
export class TodoService {
  constructor(
    @Inject('TODO_REPOSITORY')
    private todoRepository: Repository<Todo>,
  ) {}

  async findAll(): Promise<TodoResponseDto[]> {
    return this.todoRepository.find();
  }

  async findOne(id: string): Promise<TodoResponseDto | null> {
    return this.todoRepository.findOneBy({ id });
  }

  async create(
    createTodoRequestDto: CreateTodoRequestDto,
  ): Promise<TodoResponseDto> {
    const existingTodo = await this.todoRepository.findOneBy({
      title: createTodoRequestDto.title,
    });
    if (existingTodo) {
      throw new BadRequestException('Todo already exists');
    }
    return this.todoRepository.save(createTodoRequestDto);
  }

  async update(
    id: string,
    updateTodoRequestDto: UpdateTodoRequestDto,
  ): Promise<TodoResponseDto | null> {
    await this.todoRepository.update(id, updateTodoRequestDto);
    return this.findOne(id);
  }

  async delete(id: string): Promise<void> {
    await this.todoRepository.delete(id);
  }
}

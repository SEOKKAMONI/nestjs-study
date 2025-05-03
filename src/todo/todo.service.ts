import {
  Injectable,
  Inject,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { CreateTodoRequestDto } from './dtos/create-todo.dto';
import { TodoResponseDto } from './dtos/todo.dto';
import { UpdateTodoRequestDto } from './dtos/update-todo.dto';
import { TodoEntity } from './entities/todo.entity';

@Injectable()
export class TodoService {
  constructor(
    @Inject('TODO_REPOSITORY')
    private todoRepository: Repository<TodoEntity>,
  ) {}

  async findAll(userId: string): Promise<TodoResponseDto[]> {
    return this.todoRepository.find({
      where: { user: { id: userId } },
      relations: ['user'],
    });
  }

  async findOne(userId: string, id: string): Promise<TodoResponseDto> {
    const todo = await this.todoRepository.findOne({
      where: { id, user: { id: userId } },
      relations: ['user'],
    });
    if (!todo) {
      throw new NotFoundException(`Todo with id ${id} not found`);
    }
    return todo;
  }

  async create(
    userId: string,
    createTodoRequestDto: CreateTodoRequestDto,
  ): Promise<TodoResponseDto> {
    const existingTodo = await this.todoRepository.findOneBy({
      title: createTodoRequestDto.title,
      user: { id: userId },
    });
    if (existingTodo) {
      throw new BadRequestException('Todo already exists');
    }
    const newTodo = this.todoRepository.create({
      title: createTodoRequestDto.title,
      isCompleted: createTodoRequestDto.isCompleted,
      user: { id: userId },
    });
    return this.todoRepository.save(newTodo);
  }

  async update(
    userId: string,
    id: string,
    updateTodoRequestDto: UpdateTodoRequestDto,
  ): Promise<TodoResponseDto | null> {
    await this.todoRepository.update(
      { id, user: { id: userId } },
      updateTodoRequestDto,
    );
    return this.findOne(userId, id);
  }

  async delete(userId: string, id: string): Promise<void> {
    await this.todoRepository.delete({ id, user: { id: userId } });
  }
}

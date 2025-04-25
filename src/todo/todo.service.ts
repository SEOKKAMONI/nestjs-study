import { Injectable, Inject, BadRequestException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Todo } from './entities/todo.entity';

@Injectable()
export class TodoService {
  constructor(
    @Inject('TODO_REPOSITORY')
    private todoRepository: Repository<Todo>,
  ) {}

  async findAll(): Promise<Todo[]> {
    return this.todoRepository.find();
  }

  async findOne(id: Todo['id']): Promise<Todo | null> {
    return this.todoRepository.findOneBy({ id });
  }

  async create(todo: Todo): Promise<Todo> {
    const existingTodo = await this.todoRepository.findOneBy({
      title: todo.title,
    });
    if (existingTodo) {
      throw new BadRequestException('Todo already exists');
    }
    return this.todoRepository.save(todo);
  }

  async update(id: Todo['id'], todo: Todo): Promise<Todo | null> {
    await this.todoRepository.update(id, todo);
    return this.findOne(id);
  }

  async delete(id: Todo['id']): Promise<void> {
    await this.todoRepository.delete(id);
  }
}

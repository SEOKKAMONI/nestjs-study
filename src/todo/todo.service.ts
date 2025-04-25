import { Injectable, Inject } from '@nestjs/common';
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

  async findOne(id: string): Promise<Todo | null> {
    return this.todoRepository.findOneBy({ id });
  }

  async create(todo: Todo): Promise<Todo> {
    return this.todoRepository.save(todo);
  }

  async update(id: string, todo: Todo): Promise<Todo | null> {
    await this.todoRepository.update(id, todo);
    return this.findOne(id);
  }

  async delete(id: string): Promise<void> {
    await this.todoRepository.delete(id);
  }
}

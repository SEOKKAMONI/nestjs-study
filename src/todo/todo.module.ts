import { DatabaseModule } from 'src/config/database/database.module';
import { todoProviders } from './todo.providers';
import { TodoService } from './todo.service';
import { Module } from '@nestjs/common';
import { TodoController } from './todo.controller';

@Module({
  imports: [DatabaseModule],
  providers: [...todoProviders, TodoService],
  controllers: [TodoController],
})
export class TodoModule {}

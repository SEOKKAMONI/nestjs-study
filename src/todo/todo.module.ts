import { DatabaseModule } from 'src/config/database/database.module';
import { todoProviders } from './todo.providers';
import { TodoService } from './todo.service';
import { Module } from '@nestjs/common';
import { TodoController } from './todo.controller';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [DatabaseModule, AuthModule],
  providers: [...todoProviders, TodoService],
  controllers: [TodoController],
})
export class TodoModule {}

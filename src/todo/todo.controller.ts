import {
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
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { TodoResponseDto } from './dtos/responses/todo.dto';
import { CreateTodoRequestDto } from './dtos/requests/create-todo.dto';
import { UpdateTodoRequestDto } from './dtos/requests/update-todo.dto';
import { Todo } from './entities/todo.entity';

@ApiTags('todo')
@Controller('todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Get()
  @ApiOperation({ summary: 'Get all todos' })
  @ApiResponse({
    status: 200,
    description: 'The list of todos',
    type: TodoResponseDto,
    isArray: true,
  })
  async findAll(): Promise<TodoResponseDto[]> {
    return this.todoService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a todo by id' })
  @ApiResponse({
    status: 200,
    description: 'The todo',
    type: TodoResponseDto,
  })
  @ApiParam({
    name: 'id',
    description: 'The id of the todo',
    type: String,
  })
  async findOne(@Param('id') id: Todo['id']): Promise<TodoResponseDto | null> {
    const todo = await this.todoService.findOne(id);
    if (!todo) {
      throw new NotFoundException(`Todo with id ${id} not found`);
    }
    return todo;
  }

  @Post()
  @ApiOperation({ summary: 'Create a new todo' })
  @ApiResponse({
    description: 'The created todo',
    type: TodoResponseDto,
  })
  @ApiBody({
    description: 'The todo to create',
    type: CreateTodoRequestDto,
  })
  async create(
    @Body() createTodoRequestDto: CreateTodoRequestDto,
  ): Promise<TodoResponseDto> {
    return this.todoService.create(createTodoRequestDto);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a todo by id' })
  @ApiResponse({
    status: 200,
    description: 'The updated todo',
    type: TodoResponseDto,
  })
  @ApiBody({
    description: 'The todo to update',
    type: UpdateTodoRequestDto,
  })
  @ApiParam({
    name: 'id',
    description: 'The id of the todo',
    type: String,
  })
  async update(
    @Param('id') id: Todo['id'],
    @Body() updateTodoRequestDto: UpdateTodoRequestDto,
  ): Promise<TodoResponseDto | null> {
    return this.todoService.update(id, updateTodoRequestDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a todo by id' })
  @ApiResponse({
    status: 200,
    description: 'The deleted todo',
  })
  @ApiParam({
    name: 'id',
    description: 'The id of the todo',
    type: String,
  })
  async delete(@Param('id') id: Todo['id']): Promise<void> {
    return this.todoService.delete(id);
  }
}

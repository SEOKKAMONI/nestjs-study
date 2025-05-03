import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { TodoService } from './todo.service';
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { TodoResponseDto } from './dtos/todo.dto';
import { CreateTodoRequestDto } from './dtos/create-todo.dto';
import { UpdateTodoRequestDto } from './dtos/update-todo.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { User } from 'src/common/decorators/User';
import { UserDto } from 'src/user/dtos/user.dto';

@ApiTags('todo')
@Controller('todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Get all todos' })
  @ApiResponse({
    status: 200,
    description: 'The list of todos',
    type: TodoResponseDto,
    isArray: true,
  })
  async findAll(@User() user: UserDto): Promise<TodoResponseDto[]> {
    return this.todoService.findAll(user.id);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
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
  async findOne(
    @User() user: UserDto,
    @Param('id') id: string,
  ): Promise<TodoResponseDto | null> {
    return this.todoService.findOne(user.id, id);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Create a new todo' })
  @ApiResponse({
    status: 201,
    description: 'The created todo',
    type: TodoResponseDto,
  })
  @ApiBody({
    description: 'The todo to create',
    type: CreateTodoRequestDto,
  })
  async create(
    @User() user: UserDto,
    @Body() createTodoRequestDto: CreateTodoRequestDto,
  ): Promise<TodoResponseDto> {
    return this.todoService.create(user.id, createTodoRequestDto);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
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
    @User() user: UserDto,
    @Param('id') id: string,
    @Body() updateTodoRequestDto: UpdateTodoRequestDto,
  ): Promise<TodoResponseDto | null> {
    return this.todoService.update(user.id, id, updateTodoRequestDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
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
  async delete(@User() user: UserDto, @Param('id') id: string): Promise<void> {
    return this.todoService.delete(user.id, id);
  }
}

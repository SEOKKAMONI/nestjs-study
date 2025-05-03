import { Body, Controller, Get, Put, UseGuards } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserService } from './user.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { User } from 'src/common/decorators/User';
import { UserDto, UserResponseDto } from './dtos/user.dto';
import { UpdateUserRequestDto } from './dtos/update-user.dto';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('me')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Get my information' })
  @ApiResponse({
    status: 200,
    description: 'My information',
    type: UserResponseDto,
  })
  async findOne(@User() user: UserDto): Promise<UserResponseDto | null> {
    return this.userService.findOneById(user.id);
  }

  @Put('me')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Update my information' })
  @ApiResponse({
    status: 200,
    description: 'The updated my information',
    type: UserResponseDto,
  })
  @ApiBody({
    description: 'My information to update',
    type: UpdateUserRequestDto,
  })
  async update(
    @User() user: UserDto,
    @Body() updateUserRequestDto: UpdateUserRequestDto,
  ): Promise<UserResponseDto | null> {
    return this.userService.update(user.id, updateUserRequestDto);
  }
}

import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { UserResponseDto } from './dtos/responses/user.dto';
import { CreateUserRequestDto } from './dtos/requests/create-user.dto';
import { UpdateUserRequestDto } from './dtos/requests/update-user.dto';

@Injectable()
export class UserService {
  constructor(
    @Inject('USER_REPOSITORY')
    private userRepository: Repository<User>,
  ) {}

  async findOne(id: string): Promise<UserResponseDto | null> {
    return this.userRepository.findOneBy({ id });
  }

  async create(
    createUserRequestDto: CreateUserRequestDto,
  ): Promise<UserResponseDto> {
    const existingUser = await this.userRepository.findOneBy({
      email: createUserRequestDto.email,
    });
    if (existingUser) {
      throw new BadRequestException('User already exists');
    }
    return this.userRepository.save(createUserRequestDto);
  }

  async update(
    id: string,
    updateUserRequestDto: UpdateUserRequestDto,
  ): Promise<UserResponseDto | null> {
    await this.userRepository.update(id, updateUserRequestDto);
    return this.findOne(id);
  }

  async delete(id: string): Promise<void> {
    await this.userRepository.delete(id);
  }
}

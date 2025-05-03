import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { UserEntity } from './entities/user.entity';
import { UserResponseDto } from './dtos/user.dto';
import { CreateUserRequestDto } from './dtos/create-user.dto';
import { UpdateUserRequestDto } from './dtos/update-user.dto';

@Injectable()
export class UserService {
  constructor(
    @Inject('USER_REPOSITORY')
    private userRepository: Repository<UserEntity>,
  ) {}

  async findOneById(id: string): Promise<UserResponseDto | null> {
    return this.userRepository.findOneBy({ id });
  }

  async findOneByProviderId(
    providerId: string,
  ): Promise<UserResponseDto | null> {
    return this.userRepository.findOneBy({ providerId });
  }

  async create(
    createUserRequestDto: CreateUserRequestDto,
  ): Promise<UserResponseDto> {
    const existingUser = await this.findOneByProviderId(
      createUserRequestDto.providerId,
    );
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
    return this.findOneById(id);
  }

  async delete(id: string): Promise<void> {
    await this.userRepository.delete(id);
  }
}

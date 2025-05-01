import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { userProviders } from './user.providers';

@Module({
  providers: [...userProviders, UserService],
  exports: [UserService],
})
export class UserModule {}

import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { userProviders } from './user.providers';
import { DatabaseModule } from 'src/config/database/database.module';

@Module({
  imports: [DatabaseModule],
  providers: [...userProviders, UserService],
  exports: ['USER_REPOSITORY', UserService],
})
export class UserModule {}

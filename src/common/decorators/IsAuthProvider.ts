import { applyDecorators } from '@nestjs/common';
import { IsEnum } from 'class-validator';

export function IsAuthProvider() {
  return applyDecorators(
    IsEnum({ type: 'enum', enum: ['google'], default: 'google' }),
  );
}

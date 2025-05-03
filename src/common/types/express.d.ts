import { UserResponseDto } from 'src/user/dtos/responses/user.dto';

declare global {
  namespace Express {
    // eslint-disable-next-line @typescript-eslint/no-empty-object-type
    interface User extends UserResponseDto {}

    interface Request {
      user?: User;
    }
  }
}

import { UserDto } from 'src/user/dtos/user.dto';

declare global {
  namespace Express {
    // eslint-disable-next-line @typescript-eslint/no-empty-object-type
    interface User extends UserDto {}

    interface Request {
      user?: User;
    }
  }
}

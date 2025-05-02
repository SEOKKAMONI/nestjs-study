import { User as ExpressUser } from 'src/common/interfaces/user.interface';

declare global {
  namespace Express {
    // eslint-disable-next-line @typescript-eslint/no-empty-object-type
    interface User extends ExpressUser {}
    interface Request {
      user?: User;
    }
  }
}

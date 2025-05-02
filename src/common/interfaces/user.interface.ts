export interface User {
  id: string;
  email?: string;
  firstName?: string;
  lastName?: string;
  photo?: string;
  provider: 'google';
  providerId: string;
  createdAt: Date;
  updatedAt: Date;
}

export type UserProfile = GoogleUserProfile;

export interface GoogleUserProfile {
  email?: string;
  firstName?: string;
  lastName?: string;
  photo?: string;
  provider: 'google';
  providerId: string;
}

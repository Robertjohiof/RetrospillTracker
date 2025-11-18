export interface User {
  userId: number;
  userName: string;
  slug: string;
  email: string;
  firstName: string;
  lastName: string;
  profilePicture?: string;
  profileBanner?: string;
  biography: string;
  isActive: boolean;
  roleId: number;
}
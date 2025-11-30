/*export interface User {
  userId: number;
  userName: string;
  slug: string;
  email: string;
  firstName: string | null;
  lastName: string | null;
  profilePicture?: string | null;
  profileBanner?: string | null;
  biography: string | null;
  isActive: boolean;
  roleId: number;
  createdAt: string | null;
  updatedAt: string | null;
}*/

import {User} from "@/db/schema";

export interface UserGame {
  gameId: number;
  title: string;
  status: string | undefined;
  score: number | null;
  playTime: number | null;
  finishedAt: string | null;
  priority: number | null;
  platform: string | null;
}

interface Collections {
  collectionId: number;
  name: string | null;
  isBacklog: boolean;
  isPublic: boolean;
}

export interface ProfileData {
  user: User;
  collections: Collections[];
  userGames: UserGame[];
}
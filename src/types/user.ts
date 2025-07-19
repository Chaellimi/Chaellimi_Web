export interface User {
  id: number;
  username: string;
  email: string;
  name: string;
  points: number;
  role: 'USER' | 'ADMIN';
  isActive: boolean;
  createdAt: string;
  lastLogin: string;
  profileImage?: string;
}

export interface ApiUser {
  userId: number;
  authId: string;
  email: string;
  name: string;
  profileImg: string;
  provider: string;
  role: 'user' | 'admin';
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  Point: {
    totalPoint: string;
  } | null;
}

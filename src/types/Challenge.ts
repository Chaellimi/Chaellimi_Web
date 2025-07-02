export interface ChallengeFilter {
  dayStart?: string;
  dayEnd?: string;
  category?: string;
  difficulty?: 'easy' | 'normal' | 'hard';
  page?: number;
  size?: number;
}

export interface ChallengeType {
  id: number;
  userId: number;
  title: string;
  description: string;
  category: string;
  difficulty: 'hard' | 'normal' | 'easy';
  day: string;
  imgURL: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  User: {
    name: string;
    profileImg: string;
  };
  participantCount: number;
}

export interface ChallengeWriteType {
  imgURL: string;
  category: 'health' | 'productivity' | 'creativity' | 'learning';
  title: string;
  day: string;
  difficulty: 'hard' | 'normal' | 'easy';
  description: string;
}

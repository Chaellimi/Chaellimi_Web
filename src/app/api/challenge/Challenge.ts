export interface ChallengeData {
  title: string;
  description: string;
  category: string;
  difficulty: 'easy' | 'normal' | 'hard';
  day: number;
  imgURL: string;
}

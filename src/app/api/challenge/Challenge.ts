export interface ChallengeData {
  title: string;
  description: string;
  category: string;
  difficulty: 'easy' | 'normal' | 'hard';
  day: string;
  imgURL: string;
}

import { ChallengeWriteType, ChallengeFilter } from '@/types/Challenge';
import axios from 'axios';

const getChallenge = async ({
  dayStart,
  dayEnd,
  category,
  difficulty,
  page,
  size,
}: ChallengeFilter) => {
  const { data } = await axios.get(
    `/api/challenge?${dayStart ? `dayStart=${dayStart}&` : ''}${dayEnd ? `dayEnd=${dayEnd}&` : ''}${category ? `category=${category}&` : ''}${difficulty ? `difficulty=${difficulty}&` : ''}${page ? `page=${page}&` : ''}${size ? `size=${size}` : ''}`
  );
  return data;
};

const postChallenge = async ({
  imgURL,
  category,
  title,
  day,
  difficulty,
  description,
}: ChallengeWriteType) => {
  const { data } = await axios.post('/api/challenge', {
    imgURL,
    category,
    title,
    day,
    difficulty,
    description,
  });

  return data;
};

const getChallengeById = async (id: number) => {
  const { data } = await axios.get(`/api/challenge/${id}`);
  return data;
};

const API = { getChallenge, postChallenge, getChallengeById };

export default API;

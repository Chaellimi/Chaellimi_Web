import { ChallengFilter } from '@/types/Challenge';
import axios from 'axios';

const getChallenge = async ({
  dayStart,
  dayEnd,
  category,
  difficulty,
  page,
  size,
}: ChallengFilter) => {
  const { data } = await axios.get(
    `/api/challenge?${dayStart ? `dayStart=${dayStart}&` : ''}${dayEnd ? `dayEnd=${dayEnd}&` : ''}${category ? `category=${category}&` : ''}${difficulty ? `difficulty=${difficulty}&` : ''}${page ? `page=${page}&` : ''}${size ? `size=${size}` : ''}`
  );
  return data;
};

const API = { getChallenge };

export default API;

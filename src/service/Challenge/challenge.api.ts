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

export const updateChallenge = async (
  id: number,
  payload: ChallengeWriteType
) => {
  const { data } = await axios.put(`/api/challenge?id=${id}`, payload);
  return data;
};

const deleteChallenge = async (id: number) => {
  const { data } = await axios.delete(`/api/challenge?id=${id}`);
  return data;
};

const postJoinChallenge = async (id: string) => {
  const { data } = await axios.post(`/api/challenge/${id}/join`);
  return data;
};

const getChallengeById = async (id: number) => {
  const { data } = await axios.get(`/api/challenge/${id}`);
  return data;
};

const getParticipatingChallenge = async () => {
  const { data } = await axios.get(`/api/challenge/participating`);
  return data;
};

const getPopularChallenge = async (limit: number) => {
  const { data } = await axios.get(`/api/challenge/hot?limit=${limit}`);
  return data;
};

const postCertification = async ({
  challengeId,
  imgURL,
}: {
  challengeId: string;
  imgURL: string;
}) => {
  const { data } = await axios.post(`/api/challenge/certification`, {
    challengeId,
    imgURL,
  });
  return data;
};

const getChallengeProgressLog = async (challengeId: string) => {
  const { data } = await axios.get(
    `/api/challenge/participating/${challengeId}`
  );
  return data;
};

const API = {
  getChallenge,
  postChallenge,
  updateChallenge,
  deleteChallenge,
  postJoinChallenge,
  getChallengeById,
  getParticipatingChallenge,
  getPopularChallenge,
  postCertification,
  getChallengeProgressLog,
};

export default API;

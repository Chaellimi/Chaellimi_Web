import axios from 'axios';

const postUploadImg = async (formData: FormData) => {
  const { data } = await axios.post('/api/upload', formData);
  return data;
};

const getUserRole = async () => {
  const { data } = await axios.get('/api/user');
  return data;
};

const getProfileChallengeState = async () => {
  const { data } = await axios.get('/api/challenge/profile');
  return data;
};

const getBookmarkList = async () => {
  const { data } = await axios.get('/api/challenge/bookmark');
  return data;
};

const postBookmarkUpdate = async (challengeId: number) => {
  const { data } = await axios.post('/api/challenge/bookmark', { challengeId });
  return data;
};

const API = {
  postUploadImg,
  getUserRole,
  getProfileChallengeState,
  getBookmarkList,
  postBookmarkUpdate,
};

export default API;

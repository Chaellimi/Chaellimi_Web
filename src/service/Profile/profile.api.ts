import axios from 'axios';

const getProfileDetail = async () => {
  const { data } = await axios.get(`/api/challenge/profile/detail`);
  return data;
};

const API = {
  getProfileDetail,
};

export default API;

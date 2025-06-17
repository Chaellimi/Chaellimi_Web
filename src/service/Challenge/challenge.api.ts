import axios from 'axios';

const getChallenge = async () => {
  const { data } = await axios.get('/api/challenge');
  return data;
};

const API = { getChallenge };

export default API;

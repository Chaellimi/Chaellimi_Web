import axios from 'axios';

const getPoint = async () => {
  const { data } = await axios.get(`/api/point`);
  return data;
};

const API = {
  getPoint,
};

export default API;

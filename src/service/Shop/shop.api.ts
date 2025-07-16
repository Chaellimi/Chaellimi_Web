import axios from 'axios';

const getProduct = async () => {
  const { data } = await axios.get(`/api/shop`);
  return data;
};

const API = {
  getProduct,
};

export default API;

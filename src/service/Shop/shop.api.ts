import axios from 'axios';

const getProduct = async () => {
  const { data } = await axios.get(`/api/shop`);
  return data;
};

const getProductById = async (id: string) => {
  const { data } = await axios.get(`/api/shop/${id}`);
  return data;
};

const getCustody = async () => {
  const { data } = await axios.get(`/api/shop/custody`);
  return data;
};

const postBuyProduct = async (id: string) => {
  const { data } = await axios.post(`/api/shop/${id}/buy`);
  return data;
};

const API = {
  getProduct,
  getProductById,
  getCustody,
  postBuyProduct,
};

export default API;

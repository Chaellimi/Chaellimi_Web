import axios from 'axios';

const getProduct = async () => {
  const { data } = await axios.get(`/api/shop`);
  return data;
};

const getProductById = async (id: string) => {
  const { data } = await axios.get(`/api/shop/${id}`);
  return data;
};

const API = {
  getProduct,
  getProductById,
};

export default API;

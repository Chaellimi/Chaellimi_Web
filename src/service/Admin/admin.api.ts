import axios from 'axios';

const getAdminHome = async () => {
  const { data } = await axios.get('/api/admin');
  return data;
};

const getAdminUser = async () => {
  const { data } = await axios.get('/api/admin/users');
  return data;
};

const editAdminUser = async (userData: {
  userId: number;
  name: string;
  email: string;
  points: number;
  role: string;
  profileImg?: string;
}) => {
  const { data } = await axios.post('/api/admin/users/edit', userData);
  return data;
};

const editAdminProduct = async (productData: {
  productId: number;
  category: string;
  imgURL: string;
  brand: string;
  price: string | number;
  title: string;
  explanation?: string;
}) => {
  const { data } = await axios.put('/api/admin/product', productData);
  return data;
};

const createAdminProduct = async (productData: {
  category: string;
  imgURL: string;
  brand: string;
  price: number;
  title: string;
  explanation: string;
}) => {
  const { data } = await axios.post('/api/shop', productData);
  return data;
};

const deleteAdminProduct = async (productId: number) => {
  const { data } = await axios.delete(`/api/admin/product`, {
    data: { productId },
  });
  return data;
};

const API = {
  getAdminHome,
  getAdminUser,
  editAdminUser,
  editAdminProduct,
  createAdminProduct,
  deleteAdminProduct,
};

export default API;

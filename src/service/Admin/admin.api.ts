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
  const { data } = await axios.put('/api/admin/users', userData);
  return data;
};

const API = {
  getAdminHome,
  getAdminUser,
  editAdminUser,
};

export default API;

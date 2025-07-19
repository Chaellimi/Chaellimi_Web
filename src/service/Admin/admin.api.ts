import axios from 'axios';

const getAdminHome = async () => {
  const { data } = await axios.get('/api/admin');
  return data;
};

const getAdminUser = async () => {
  const { data } = await axios.get('/api/admin/users');
  return data;
};

const API = {
  getAdminHome,
  getAdminUser,
};

export default API;

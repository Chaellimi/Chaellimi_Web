import axios from 'axios';

const getAdminHome = async () => {
  const { data } = await axios.get('/api/admin');
  return data;
};

const API = {
  getAdminHome,
};

export default API;

import axios from 'axios';

const postUploadImg = async (formData: FormData) => {
  const { data } = await axios.post('/api/upload', formData);
  return data;
};

const getUserRole = async () => {
  const { data } = await axios.get('/api/user');
  return data;
};

const API = { postUploadImg, getUserRole };

export default API;

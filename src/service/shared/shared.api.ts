import axios from 'axios';

const postUploadImg = async (formData: FormData) => {
  const { data } = await axios.post('/api/upload', formData);
  return data;
};

const API = { postUploadImg };

export default API;

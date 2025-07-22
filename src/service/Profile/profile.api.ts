import axios from 'axios';

const getProfileDetail = async () => {
  const { data } = await axios.get(`/api/challenge/profile/detail`);
  return data;
};

const editProfileUser = async (name: string, profileImg: string) => {
  const { data } = await axios.put(`/api/user`, { name, profileImg });
  return data;
};

const API = {
  getProfileDetail,
  editProfileUser,
};

export default API;

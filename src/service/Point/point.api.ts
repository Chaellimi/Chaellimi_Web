import { PointDetailType } from '@/types/Point';
import axios from 'axios';

const getPoint = async () => {
  const { data } = await axios.get(`/api/point`);
  return data;
};

const getPointDetail = async (type?: PointDetailType) => {
  const { data } = await axios.get(`/api/point/detail?type=${type}`);
  return data;
};

const API = {
  getPoint,
  getPointDetail,
};

export default API;

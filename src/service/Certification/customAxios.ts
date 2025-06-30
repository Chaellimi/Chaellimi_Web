import axios from 'axios';
import FormData from 'form-data';
import path from 'path';
import fs from 'fs';

export const AIHandler = async ({
  image_url,
  description,
}: {
  image_url: string;
  description: string;
}) => {
  const form = new FormData();

  const fileName = path.basename(image_url);
  const filePath = path.join(process.cwd(), 'public', 'uploads', fileName);

  if (!fs.existsSync(filePath)) {
    throw new Error(`파일이 존재하지 않습니다: ${filePath}`);
  }

  form.append('image', fs.createReadStream(filePath));
  form.append('description', description);

  const API_KEY = process.env.NEXTAUTH_SECRET;

  if (!API_KEY) {
    throw new Error('API 키가 설정되지 않았습니다.');
  }

  try {
    const response = await axios.post(
      'https://ai.chaellimi.kro.kr/similarity',
      form,
      {
        headers: {
          ...form.getHeaders(),
          key: API_KEY,
        },
        maxBodyLength: Infinity,
        maxContentLength: Infinity,
      }
    );

    return response.data;
  } catch (error) {
    console.error('AI 요청 중 오류 발생:', error);
    throw new Error('AI 요청에 실패했습니다.');
  }
};

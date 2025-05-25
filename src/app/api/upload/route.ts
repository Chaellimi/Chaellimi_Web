import { NextRequest } from 'next/server';
import path from 'node:path';
import { v4 as uuid } from 'uuid';
import { promises as fs } from 'fs';
import resUtil from '@/lib/utils/responseUtil';
import File from '@/database/models/File';
import getUserFromRequest from '@/lib/utils/getUserFromRequest';
import { withLogging } from '@/lib/middleware/withLogging';
import { withAuth } from '@/lib/middleware/withAuth';

async function ImageUploadHandler(req: NextRequest) {
  const formData = await req.formData();
  const file = formData.get('image') as File;
  if (!file) {
    return resUtil.successFalse({
      status: 400,
      message: '파일이 없습니다.',
      data: {},
    });
  }

  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  const ext = path.extname(file.name);
  const safeFileName = `${uuid()}${ext}`;
  const uploadDir = path.join(process.cwd(), 'public', 'uploads');
  await fs.mkdir(uploadDir, { recursive: true });
  const finalPath = path.join(uploadDir, safeFileName);

  await fs.writeFile(finalPath, buffer);

  const fileUrl = `${process.env.NEXTAUTH_URL}/uploads/${safeFileName}`;

  const user = await getUserFromRequest();
  await File.create({
    userId: user?.id,
    fileUrl: fileUrl,
  });

  return resUtil.successTrue({
    status: 200,
    message: '업로드 성공',
    data: {
      fileUrl,
    },
  });
}
export const POST = withLogging(withAuth(ImageUploadHandler));

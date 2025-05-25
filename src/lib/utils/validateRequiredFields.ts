import { NextResponse } from 'next/server';
import resUtil from './responseUtil';

export const validateRequiredFields = (
  data: Record<string, unknown>,
  requiredFields: string[]
): NextResponse | null => {
  const missingFields = requiredFields.filter(
    (field) => !data[field] && data[field] !== 0
  );

  if (missingFields.length > 0) {
    const message = `${missingFields.join(', ')} 필드는 필수입니다.`;
    return NextResponse.json(
      resUtil.successFalse({
        status: 400,
        message,
        data: {},
      })
    );
  }

  return null;
};

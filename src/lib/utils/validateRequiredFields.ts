import { NextResponse } from 'next/server';
import resUtil from './responseUtil';

export const validateRequiredFields = (
  data: Record<string, unknown>,
  requiredFields: string[]
): NextResponse | null => {
  const missingFields = requiredFields.filter((field) => {
    const value = data[field];
    return value === undefined || value === null || value === '';
  });

  if (missingFields.length > 0) {
    const message = `${missingFields.join(', ')} 필드는 필수입니다.`;
    return resUtil.successFalse({ status: 400, message });
  }

  return null;
};

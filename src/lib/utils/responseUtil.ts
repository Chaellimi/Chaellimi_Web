import { NextResponse } from 'next/server';

interface OwnProps {
  status?: number;
  message?: string;
  data?: object;
}

const resUtil = {
  successTrue: ({ status = 200, message = '성공', data = {} }: OwnProps) => {
    return NextResponse.json(
      {
        status,
        success: true,
        message,
        data,
      },
      { status }
    );
  },

  successFalse: ({ status = 400, message = '실패', data = {} }: OwnProps) => {
    return NextResponse.json(
      {
        status,
        success: false,
        message,
        data,
      },
      { status }
    );
  },

  unknownError: ({ data = {} }: OwnProps) => {
    return NextResponse.json(
      {
        status: 500,
        success: false,
        message: '알 수 없는 에러가 발생하였습니다. Console을 확인해주세요',
        data,
      },
      { status: 500 }
    );
  },
};

export default resUtil;

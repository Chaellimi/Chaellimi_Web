interface OwnProps {
  status?: number;
  message?: string;
  data?: object;
}

const resUtil = {
  successTrue: ({ status, message, data }: OwnProps) => {
    return {
      status: status,
      success: true,
      message: message,
      data: data,
    };
  },
  successFalse: ({ status, message, data }: OwnProps) => {
    return {
      status: status,
      success: false,
      message: message,
      data: data,
    };
  },
  unknownError: ({ data }: OwnProps) => {
    return {
      status: 500,
      success: false,
      message: '알수 없는 에러가 발생하였습니다. Console을 확인해주세요',
      data: data,
    };
  },
};

export default resUtil;

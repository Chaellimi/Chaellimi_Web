const isWebEnvironment = (): boolean => {
  if (typeof window === 'undefined' || typeof navigator === 'undefined') {
    return false;
  }

  const userAgent = navigator.userAgent;
  return /Chrome|Firefox|Safari|Edge|Opera/i.test(userAgent);
};

export default isWebEnvironment;

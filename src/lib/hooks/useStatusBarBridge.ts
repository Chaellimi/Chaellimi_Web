import { useEffect } from 'react';

interface StatusBarOptions {
  backgroundColor?: string;
  barStyle?: 'light-content' | 'dark-content';
  translucent?: boolean;
  bottomBackgroundColor?: string;
}

const useStatusBarBridge = (
  options: StatusBarOptions,
  deps: unknown[] = []
): void => {
  useEffect(() => {
    if (typeof window !== 'undefined' && window.ReactNativeWebView) {
      window.ReactNativeWebView.postMessage(
        JSON.stringify({
          type: 'SET_STATUS_BAR',
          payload: options,
        })
      );
    }
  }, [deps, options]);
};

export default useStatusBarBridge;

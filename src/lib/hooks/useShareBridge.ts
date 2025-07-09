import { useCallback } from 'react';

interface ShareOptions {
  url: string;
  title?: string;
}

const useShareBridge = () => {
  const share = useCallback(({ url, title }: ShareOptions) => {
    if (typeof window !== 'undefined' && window.ReactNativeWebView) {
      window.ReactNativeWebView.postMessage(
        JSON.stringify({
          type: 'SHARE_LINK',
          payload: {
            url,
            title: title || document.title,
          },
        })
      );
    } else {
      console.warn('Not running inside React Native WebView');
    }
  }, []);

  return share;
};

export default useShareBridge;

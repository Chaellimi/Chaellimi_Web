import { useState, useEffect } from 'react';
import { usePostBookmarkUpdate } from '@/service/shared/shared.query';
import { useQueryClient } from '@tanstack/react-query';
import { sharedKeys } from '@/service/shared/shared.key';

interface UseBookmarkProps {
  challengeId: number;
  initialBookmarkState?: boolean;
}

export const useBookmark = ({
  challengeId,
  initialBookmarkState = false,
}: UseBookmarkProps) => {
  const [isBookmarked, setIsBookmarked] = useState(initialBookmarkState);
  const queryClient = useQueryClient();
  const bookmarkMutation = usePostBookmarkUpdate();

  // 초기 북마크 상태가 변경되면 로컬 상태도 업데이트
  useEffect(() => {
    setIsBookmarked(initialBookmarkState);
  }, [initialBookmarkState]);

  const toggleBookmark = async () => {
    // 낙관적 업데이트: UI를 즉시 변경
    const previousState = isBookmarked;
    setIsBookmarked(!isBookmarked);

    try {
      await bookmarkMutation.mutateAsync(challengeId);

      // 성공 시 북마크 리스트 다시 가져오기
      queryClient.invalidateQueries({
        queryKey: [sharedKeys.useGetBookmarkList],
      });
    } catch (error) {
      // 실패 시 이전 상태로 롤백
      setIsBookmarked(previousState);
      console.error('북마크 업데이트 실패:', error);
      // 사용자에게 에러 알림 (선택사항)
      alert('북마크 업데이트에 실패했습니다. 다시 시도해주세요.');
    }
  };

  return {
    isBookmarked,
    toggleBookmark,
    isLoading: bookmarkMutation.isPending,
  };
};

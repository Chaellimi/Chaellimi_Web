export function timeAgo(updatedAt: string): string {
  const now = new Date();
  const updated = new Date(updatedAt);
  const diffMs = now.getTime() - updated.getTime();
  const diffSec = Math.floor(diffMs / 1000);

  if (!updatedAt) return '시간 정보 없음';

  if (isNaN(updated.getTime())) {
    return '잘못된 시간 형식';
  }

  if (diffMs < 0) {
    return '방금 전';
  }

  if (diffSec < 60) {
    return `${diffSec}초 전`;
  }

  const diffMin = Math.floor(diffSec / 60);
  if (diffMin < 60) {
    return `${diffMin}분 전`;
  }

  const diffHour = Math.floor(diffMin / 60);
  if (diffHour < 24) {
    return `${diffHour}시간 전`;
  }

  const diffDay = Math.floor(diffHour / 24);
  return `${diffDay}일 전`;
}

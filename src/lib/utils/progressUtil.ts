const getChallengeProgressDay = (joinedAt: Date | string): number => {
  const start = new Date(joinedAt);
  const today = new Date();

  start.setHours(0, 0, 0, 0);
  today.setHours(0, 0, 0, 0);

  const diffTime = today.getTime() - start.getTime();
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

  return diffDays + 1;
};

const isChallengeExpired = (
  joinedAt: Date | string,
  totalDay: number
): boolean => {
  const joinedDate = new Date(joinedAt);
  const endDate = new Date(joinedDate);
  endDate.setDate(endDate.getDate() + totalDay);

  const now = new Date();
  now.setHours(0, 0, 0, 0);

  return now >= endDate;
};

const formatJoinedAndEndDate = (
  joinedAt: Date | string,
  totalDay: number
): { joinedDate: string; endDate: string } => {
  const formatDateToDot = (date: Date | string): string => {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = `${d.getMonth() + 1}`.padStart(2, '0');
    const day = `${d.getDate()}`.padStart(2, '0');
    return `${year}.${month}.${day}`;
  };

  const joined = new Date(joinedAt);
  const end = new Date(joined);
  end.setDate(end.getDate() + totalDay);

  return {
    joinedDate: formatDateToDot(joined),
    endDate: formatDateToDot(end),
  };
};

const getDateProgressRate = (
  joinedAt: Date | string,
  totalDay: number
): number => {
  const start = new Date(joinedAt);
  const today = new Date();

  start.setHours(0, 0, 0, 0);
  today.setHours(0, 0, 0, 0);

  const diffDays =
    Math.floor((today.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)) + 1;
  const rate = (diffDays / totalDay) * 100;

  return Math.min(100, Math.round(rate));
};

const progressUtil = {
  getChallengeProgressDay,
  isChallengeExpired,
  formatJoinedAndEndDate,
  getDateProgressRate,
};

export default progressUtil;

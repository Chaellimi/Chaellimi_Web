export const formatExifDate = (exifDate: string): string => {
  const [datePart, timePart] = exifDate.split(' ');
  const [year, month, day] = datePart.split(':');
  const [hour, minute] = timePart.split(':');

  let hourNum = parseInt(hour, 10);
  const isPM = hourNum >= 12;

  if (hourNum === 0) {
    hourNum = 12;
  } else if (hourNum > 12) {
    hourNum -= 12;
  }

  const hourFormatted = hourNum.toString().padStart(2, '0');
  const ampm = isPM ? 'PM' : 'AM';

  return `${year}.${month}.${day} ${hourFormatted}:${minute} ${ampm}`;
};

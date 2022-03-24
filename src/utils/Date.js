export const dateToString = (timestamp) => {
  const date = timestamp?.toDate();
  let day = date?.getDate();
  let month = date?.getMonth() + 1;

  if (day < 10) day = `0${day}`;
  if (month < 10) month = `0${month}`;

  return `${day}.${month}.${date?.getFullYear()}`;
};

export const timeToString = (timestamp) => {
  const time = timestamp?.toDate();
  let hour = time?.getHours();
  let minutes = time?.getMinutes();

  if (hour < 10) hour = `0${hour}`;
  if (minutes < 10) minutes = `0${minutes}`;

  return `${hour}:${minutes}`;
};

export const compareDates = (DBtimestamp, sysDate) => {
  const date1 = DBtimestamp?.toDate();
  const date2 = sysDate;
  const difference = date2?.getTime() - date1?.getTime();

  return difference / (1000 * 3600 * 24);
};

export const compareTimes = (DBtimestamp, sysDate) => {
  const time1 = DBtimestamp?.toDate();
  const time2 = sysDate;
  const difference = time2?.getTime() - time1?.getTime();

  return difference / (1000 * 600);
};

export const showDate = (messageDate) => {
  const currentDate = new window.Date();
  const compare = compareDates(messageDate, currentDate);
  if (compare > 1) {
    return dateToString(messageDate);
  }
  return '';
};

export const showTime = (messageDate) => {
  const currentDate = new window.Date();
  const compare = compareTimes(messageDate, currentDate);
  if (compare > 1) {
    return timeToString(messageDate);
  }
  return '';
};

export const showFullDate = (messageDate) =>
  `${showDate(messageDate)} ${showTime(messageDate)}`;

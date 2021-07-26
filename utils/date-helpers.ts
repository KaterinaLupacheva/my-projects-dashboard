import moment, { Moment } from 'moment';

export const timestampToDate = (timestamp: string): Date | string | number => {
  const options = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };
  return new Date(timestamp).toLocaleDateString('en-US', options);
};

export const daysRange = (
  startDate: string | Moment,
  endDate: string | Moment
): string[] => {
  const dates = [];
  const start = moment(startDate);
  const end = moment(endDate);

  while (start.isSameOrBefore(end)) {
    dates.push(start.format('DD-MM-YYYY'));
    start.add(1, 'days');
  }
  return dates;
};

export const getDate = (dateValue: string): string => {
  if (dateValue.length > 10) {
    return moment(new Date(dateValue).getTime()).format('YYYY-MM-DD');
  } else {
    return moment(dateValue, 'DD-MM-YYYY').format('YYYY-MM-DD');
  }
};

//current date in format "YYYY-MM-DD"
const curDate = new Date().toISOString().substring(0, 10);

//check if that there are views already today
export const checkDateExists = (array: any[]) =>
  array.find((item: any) => {
    const dbDate =
      typeof item.date !== 'string'
        ? item.date.toISOString().substring(0, 10)
        : item.date;
    return dbDate === curDate;
  });

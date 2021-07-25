import moment from 'moment';

import { DailyViews } from '../types/general';

export const prepareViewsData = (viewsData: DailyViews[]) => {
  let result = [];
  if (viewsData.length > 1) {
    for (let i = 0; i < viewsData.length; i += 2) {
      const el1 = viewsData[i];
      const el2 = viewsData[i + 1];
      const start = getDate(el1.date);
      const end = el2?.date && getDate(el2.date);

      if (!el2) {
        const prevDate = getDate(viewsData[i - 1].date);
        result.push(fillEmptyDates(prevDate, start));
        result.push(el1);
      } else {
        result.push(el1);
        result.push(fillEmptyDates(start, end));
        result.push({
          ...el2,
          date: getDate(el2.date),
        });
      }
    }
  } else {
    result = viewsData;
  }
  return result.flat();
};

const fillEmptyDates = (start: string, end: string) => {
  const emptyDates = [];
  const tempDate = moment(start).add(1, 'days');
  while (tempDate.isBetween(start, end)) {
    emptyDates.push({
      date: tempDate.format('DD-MM-YYYY'),
      views: 0,
    });
    tempDate.add(1, 'days');
  }
  return emptyDates;
};

const getDate = (dateValue: string): string => {
  if (dateValue.length > 10) {
    return moment(new Date(dateValue).getTime()).format('YYYY-MM-DD');
  } else {
    return moment(dateValue, 'DD-MM-YYYY').format('YYYY-MM-DD');
  }
};

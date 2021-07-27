import moment from 'moment';

import { CHART_DATE_FORMAT } from '../constants/date-formats';
import { DailyViews } from '../types/general';
import { dateDiff, getDate } from './date-helpers';

export const prepareViewsData = (viewsData: DailyViews[]): DailyViews[] => {
  let result = [];
  if (viewsData.length > 1) {
    for (let i = 0; i < viewsData.length; i += 2) {
      const el1 = viewsData[i];
      const el2 = viewsData[i + 1];
      const start = getDate(el1.date);
      const end = el2?.date && getDate(el2.date);

      const monthAgo = moment().subtract(30, 'days');
      if (moment(start, CHART_DATE_FORMAT).isAfter(monthAgo)) {
        const diff = dateDiff(start, end);
        if (!el2) {
          const prevDate = getDate(viewsData[i - 1].date);
          result.push(fillEmptyDates(prevDate, start));
          result.push({ ...el1, date: start });
        } else {
          result.push({ ...el1, date: start });
          if (diff > 1) {
            result.push(fillEmptyDates(start, end));
          }
          result.push({
            ...el2,
            date: end,
          });
        }
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
      date: tempDate.format(CHART_DATE_FORMAT),
      views: 0,
    });
    tempDate.add(1, 'days');
  }
  return emptyDates;
};

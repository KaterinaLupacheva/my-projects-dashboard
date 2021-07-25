import moment from 'moment';

import { GROUP, SLUGS } from '../constants/slugs';
import {
  DailyViews,
  IMappedDoc,
  IViews,
  IViewsComparison,
} from '../types/general';
import { daysRange } from './date-helpers';

const lastSevenDaysRange = daysRange(moment().subtract(6, 'days'), moment());
const prevSevenDaysRange = daysRange(
  moment().subtract(13, 'days'),
  moment().subtract(7, 'days')
);

//TODO change range prop data type
const countViews = (range: any[], viewsData: DailyViews[]) => {
  let views = 0;
  range.forEach((date) => {
    const targetDate = viewsData.find((d) => d.date === date);
    if (targetDate) {
      views += targetDate.views;
    }
  });
  return views;
};

const viewsComparison = (viewsData: DailyViews[]): IViewsComparison => {
  const thisWeekViews = countViews(lastSevenDaysRange, viewsData);
  const prevWeekViews = countViews(prevSevenDaysRange, viewsData);
  const change =
    prevWeekViews !== 0 ? (thisWeekViews / prevWeekViews - 1) * 100 : 0;
  return { thisWeekViews, change };
};

export const mapSlugs = (data: any) => {
  let id = 0;
  const mappedDocs: IMappedDoc[] = [];

  SLUGS.forEach((obj) => {
    const doc = data.docs.find((d: IViews) => d.slug === obj.slug);
    if (doc) {
      const { thisWeekViews, change } = viewsComparison(doc.viewsData);
      mappedDocs.push({
        ...doc,
        published: obj.published,
        description: obj.description,
        group: obj.group,
        thisWeekViews,
        change,
      });
    } else {
      mappedDocs.push({
        ...obj,
        _id: id,
        totalViews: 0,
        viewsData: [] as DailyViews[],
        thisWeekViews: 0,
        change: 0,
      });
      id++;
    }
  });
  return groupBy(mappedDocs, 'group');
};

type ObjectKey = keyof Omit<IMappedDoc, 'published'>;

const groupBy = (
  arr: IMappedDoc[],
  property: ObjectKey
): { [key in keyof typeof GROUP]: IMappedDoc[] } => {
  return arr.reduce((acc, cur) => {
    //@ts-ignore
    acc[cur[property]] = [...(acc[cur[property]] || []), cur];
    return acc;
  }, {} as { [key in keyof typeof GROUP]: IMappedDoc[] });
};

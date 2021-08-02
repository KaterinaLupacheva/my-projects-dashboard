import moment from 'moment';

import { GROUP, SLUGS } from '../constants/slugs';
import {
  DailyViews,
  IMappedDoc,
  ISlug,
  IViews,
  IViewsComparison,
} from '../types/general';
import { daysRange, getDate } from './date-helpers';

const lastSevenDaysRange = daysRange(moment().subtract(6, 'days'), moment());
const prevSevenDaysRange = daysRange(
  moment().subtract(13, 'days'),
  moment().subtract(7, 'days')
);

const countViews = (range: string[], viewsData: DailyViews[]) => {
  let views = 0;
  range.forEach((date) => {
    const targetDate = viewsData.find((d) => getDate(d.date) === getDate(date));
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
        ...obj,
        // published: obj.published,
        // description: obj.description,
        // group: obj.group,
        url: obj.url || getBlogUrl(obj),
        thisWeekViews,
        change,
      });
    } else {
      mappedDocs.push({
        ...obj,
        _id: id,
        url: obj.url || getBlogUrl(obj),
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

const getBlogUrl = (slugObj: ISlug) => {
  if (slugObj.group === GROUP.RAMONAK_BLOG) {
    const slug = slugObj.slug.split('ramonak:')[1];
    return `https://ramonak.io/posts/${slug.trim()}`;
  }
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

import moment from 'moment';

import { APIStatsData, IRepo, StatsData, StatsDetails } from '../types/general';
import { getDate } from './date-helpers';

const followersCount = ({
  date,
  data,
}: {
  date: string;
  data: APIStatsData[];
}): number => {
  const dayStat = data.find((item: APIStatsData) => {
    if (typeof item.date !== 'string') {
      return item.date.toISOString().substring(0, 10) === date;
    } else {
      return item.date === date;
    }
  });
  return dayStat?.count || 0;
};

const calculateChange = (data: APIStatsData[]): number | string => {
  const sevenDaysAgo = moment().subtract(7, 'days').format('YYYY-MM-DD');
  const currentFollowersCount = followersCount({
    date: moment().format('DD-MM-YYYY'),
    data,
  });
  const change =
    currentFollowersCount - followersCount({ date: sevenDaysAgo, data });
  const signedChange = change > 0 ? `+${change}` : change;
  return change !== currentFollowersCount ? signedChange : 0;
};

const transformData = (data: APIStatsData[]): StatsData[] =>
  data.map((item) => {
    return {
      ...item,
      date: getDate(
        typeof item.date !== 'string' ? item.date.toISOString() : item.date
      ),
    };
  });

export const prepareStatsDetails = (data: APIStatsData[]): StatsDetails => {
  return {
    change: calculateChange(data),
    transformedData: transformData(data),
  };
};

type StarsAndForks = {
  stars: number;
  forks: number;
};

export const countTotalStarsAndForks = (
  repos: IRepo[],
  userHandle: string
): StarsAndForks => {
  const result = { stars: 0, forks: 0 };
  repos.forEach((repo: IRepo) => {
    if (repo.owner.login === userHandle) {
      result.stars += repo.stargazers_count;
      result.forks += repo.forks_count;
    }
  });
  return result;
};

import moment from 'moment';
import { FollowersData } from '../types/general';

const followersCount = ({
  date,
  data,
}: {
  date: string;
  data: FollowersData[];
}): number => {
  const dayStat = data.find((item: FollowersData) => item.date === date);
  return dayStat?.count || 0;
};

export const calculateChange = (data: FollowersData[]): number | string => {
  const sevenDaysAgo = moment().subtract(7, 'days').format('DD-MM-YYYY');
  const currentFollowersCount = followersCount({
    date: moment().format('DD-MM-YYYY'),
    data,
  });
  const change =
    currentFollowersCount - followersCount({ date: sevenDaysAgo, data });
  const signedChange = change > 0 ? `+${change}` : change;
  return change !== currentFollowersCount ? signedChange : 0;
};

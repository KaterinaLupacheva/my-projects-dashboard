import { CircularProgress } from '@material-ui/core';
import useSWR from 'swr';

import { fetcher } from '../utils/fetcher';
import DetailedStatCard from './DetailedStatCard';

interface DetailedStatCardWrapperProps {
  query: string;
  value: number;
  title: string;
  isDevto?: boolean;
}

const DetailedStatCardWrapper = ({
  query,
  ...otherProps
}: DetailedStatCardWrapperProps): JSX.Element => {
  const { data } = useSWR(query, fetcher);

  if (!data) return <CircularProgress color="inherit" size="small" />;
  return <DetailedStatCard data={data.followersStats} {...otherProps} />;
};

export default DetailedStatCardWrapper;

import { NextApiRequest, NextApiResponse } from 'next';

import { ITweet, ITwitterUser } from '../../types/general';

type APITwitter = {
  userData: ITwitterUser;
  tweetsData: ITweet[];
};

export async function queryTwitter(): Promise<APITwitter> {
  const requestHeaders: HeadersInit = new Headers();
  process.env.TWITTER_BEARER_TOKEN &&
    requestHeaders.set(
      'Authorization',
      `Bearer ${process.env.TWITTER_BEARER_TOKEN}`
    );

  const userResponse = await fetch(
    `https://api.twitter.com/1.1/users/show.json?screen_name=${process.env.TWITTER_USERNAME}`,
    {
      headers: requestHeaders,
    }
  );

  const tweetsResponse = await fetch(
    `https://api.twitter.com/1.1/statuses/user_timeline.json?screen_name=${process.env.TWITTER_USERNAME}`,
    {
      headers: requestHeaders,
    }
  );

  const userData: ITwitterUser = await userResponse.json();
  const tweetsData: ITweet[] = await tweetsResponse.json();

  return { userData, tweetsData };
}

export default async (
  _: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  const { userData, tweetsData } = await queryTwitter();

  return res.status(200).json({
    userData,
    tweetsData,
  });
};
